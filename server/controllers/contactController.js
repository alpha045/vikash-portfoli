import nodemailer from "nodemailer";

import {
  generateAdminNotificationEmail,
  generateVisitorAutoReplyEmail,
} from "../utils/emailTemplates.js";

export const sendContactEmail = async (req, res) => {
  const timestamp = new Date().toISOString();

  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "Unknown";

  try {
    const { name, email, subject, message } = req.body || {};

    // 1. Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 2. Read SMTP configuration
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 587);

    const recipient = process.env.RECIPIENT_EMAIL;

    if (!smtpUser || !smtpPass || !recipient) {
      console.error("Missing SMTP_USER, SMTP_PASS, or RECIPIENT_EMAIL");

      return res.status(500).json({
        success: false,
        message: "Email service is not configured correctly.",
      });
    }

    if (![465, 587].includes(smtpPort)) {
      return res.status(500).json({
        success: false,
        message: "Invalid SMTP port configuration.",
      });
    }

    // 3. Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 30000,
    });

    // 4. Prepare admin notification
    const adminHtml = generateAdminNotificationEmail({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      ip,
      timestamp,
    });

    const adminText = `
New Portfolio Inquiry

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Date: ${timestamp}

Message:
${cleanMessage}
    `.trim();

    // 5. Send notification to portfolio owner
    const adminResult = await transporter.sendMail({
      from: `"Vikash Portfolio" <${smtpUser}>`,
      to: recipient,
      replyTo: cleanEmail,
      subject: `Portfolio Inquiry: ${cleanSubject}`,
      text: adminText,
      html: adminHtml,
    });

    console.log("Admin email sent:", {
      messageId: adminResult.messageId,
      recipient,
    });

    // 6. Send confirmation to visitor
    if (process.env.SEND_AUTOREPLY !== "false") {
      try {
        const visitorHtml = generateVisitorAutoReplyEmail({
          name: cleanName,
          subject: cleanSubject,
          message: cleanMessage,
        });

        const visitorResult = await transporter.sendMail({
          from: `"Vikash Kumar" <${smtpUser}>`,
          to: cleanEmail,
          replyTo: smtpUser,
          subject: "Thank you for contacting Vikash Kumar!",
          html: visitorHtml,
          text: `Hi ${cleanName}, thank you for contacting Vikash Kumar. Your message regarding "${cleanSubject}" has been received.`,
        });

        console.log("Visitor auto-reply sent:", {
          messageId: visitorResult.messageId,
        });
      } catch (autoReplyError) {
        // Admin notification succeeded; auto-reply failure is logged separately.
        console.error("Visitor auto-reply failed:", {
          code: autoReplyError.code,
          message: autoReplyError.message,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      timestamp,
    });
  } catch (error) {
    console.error("Contact email dispatch failed:", {
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
};