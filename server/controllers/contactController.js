
import nodemailer from 'nodemailer';

import {
  generateAdminNotificationEmail,
  generateVisitorAutoReplyEmail,
} from '../utils/emailTemplates.js';

export const sendContactEmail = async (req, res) => {
  const timestamp = new Date().toISOString();

  const ip =
    req.ip ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    '127.0.0.1';

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
        message: 'All fields (name, email, subject, message) are required.',
      });
    }

    // 2. Read SMTP configuration
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const recipient =
      process.env.RECIPIENT_EMAIL || 'vikashkumar161012@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.error('SMTP configuration error: credentials are missing.');

      return res.status(500).json({
        success: false,
        message: 'Email service is not configured correctly.',
      });
    }

    if (![465, 587].includes(smtpPort)) {
      console.error('SMTP configuration error: invalid SMTP port.');

      return res.status(500).json({
        success: false,
        message: 'Invalid email service configuration.',
      });
    }

    const cleanPass = smtpPass.replace(/\s+/g, '');

    // 3. Explicit SMTP configuration
    // Port 587: STARTTLS
    // Port 465: Implicit TLS
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      family: 4,
      auth: {
        user: smtpUser,
        pass: cleanPass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    console.log('SMTP configuration:', {
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
    });

    // 4. Generate admin notification email
    const adminHtml = generateAdminNotificationEmail({
      name,
      email,
      subject,
      message,
      ip,
      timestamp,
    });

    const adminText = `
New inquiry from ${name}

Name: ${name}
Email: ${email}
Subject: ${subject}
Date: ${timestamp}

Message:
${message}
    `.trim();

    // 5. Send email to portfolio owner
    const adminResult = await transporter.sendMail({
      from: `"Vikash Portfolio Contact" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `Portfolio Inquiry: ${subject} - from ${name}`,
      text: adminText,
      html: adminHtml,
    });

    console.log('Admin notification accepted by SMTP:', {
      messageId: adminResult.messageId,
      recipient,
    });

    // 6. Send auto-reply to visitor
    const sendAutoReply = process.env.SEND_AUTOREPLY !== 'false';

    if (sendAutoReply) {
      try {
        const visitorHtml = generateVisitorAutoReplyEmail({
          name,
          subject,
          message,
        });

        const visitorResult = await transporter.sendMail({
          from: `"Vikash Kumar" <${smtpUser}>`,
          to: email,
          replyTo: smtpUser,
          subject: 'Thank you for reaching out! - Vikash Kumar',
          html: visitorHtml,
          text: `Hi ${name}, thank you for contacting Vikash Kumar. Your message regarding "${subject}" has been received.`,
        });

        console.log('Visitor auto-reply accepted by SMTP:', {
          messageId: visitorResult.messageId,
        });
      } catch (autoReplyError) {
        // Admin notification already succeeded; don't report the whole
        // contact submission as failed just because auto-reply failed.
        console.error('Visitor auto-reply failed:', {
          code: autoReplyError.code,
          command: autoReplyError.command,
          responseCode: autoReplyError.responseCode,
          message: autoReplyError.message,
        });
      }
    }

    // 7. Respond to frontend
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
      timestamp,
    });
  } catch (error) {
    // Log details only on the server. Never expose SMTP credentials.
    console.error('Contact Email Dispatch Failure:', {
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message:
        'Unable to send your message right now. Please try again later.',
    });
  }
};
