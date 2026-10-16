
import { Resend } from 'resend';

import {
  generateAdminNotificationEmail,
  generateVisitorAutoReplyEmail,
} from '../utils/emailTemplates.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use a sender address verified in your Resend account.
// For testing, configure this value using your Resend onboarding
// sender if it is available to your account.
const FROM_EMAIL =
  process.env.FROM_EMAIL || 'onboarding@resend.dev';

export const sendContactEmail = async (req, res) => {
  const timestamp = new Date().toISOString();

  const ip =
    req.ip ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  try {
    const { name, email, subject, message } = req.body || {};

    // 1. Validate form fields
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

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    // 2. Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend configuration error: API key is missing.');

      return res.status(500).json({
        success: false,
        message: 'Email service is not configured correctly.',
      });
    }

    const recipient =
      process.env.RECIPIENT_EMAIL ||
      'vikashkumar161012@gmail.com';

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // 3. Generate admin notification
    const adminHtml = generateAdminNotificationEmail({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      ip,
      timestamp,
    });

    const adminText = `
New portfolio inquiry

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Date: ${timestamp}

Message:
${cleanMessage}
    `.trim();

    // 4. Send admin notification using Resend API
    const { data: adminResult, error: adminError } =
      await resend.emails.send({
        from: `Vikash Portfolio <${FROM_EMAIL}>`,
        to: [recipient],
        replyTo: cleanEmail,
        subject: `Portfolio Inquiry: ${cleanSubject} - from ${cleanName}`,
        text: adminText,
        html: adminHtml,
      });

    if (adminError) {
      console.error('Resend admin email error:', {
        name: adminError.name,
        message: adminError.message,
      });

      return res.status(502).json({
        success: false,
        message: 'Unable to send your message right now. Please try again later.',
      });
    }

    console.log('Admin notification accepted by Resend:', {
      id: adminResult?.id,
      recipient,
    });

    // 5. Send visitor auto-reply
    const sendAutoReply =
      process.env.SEND_AUTOREPLY !== 'false';

    if (sendAutoReply) {
      try {
        const visitorHtml = generateVisitorAutoReplyEmail({
          name: cleanName,
          subject: cleanSubject,
          message: cleanMessage,
        });

        const { data: visitorResult, error: visitorError } =
          await resend.emails.send({
            from: `Vikash Kumar <${FROM_EMAIL}>`,
            to: [cleanEmail],
            replyTo: recipient,
            subject: 'Thank you for reaching out! - Vikash Kumar',
            html: visitorHtml,
            text: `Hi ${cleanName}, thank you for contacting Vikash Kumar. Your message regarding "${cleanSubject}" has been received.`,
          });

        if (visitorError) {
          console.error('Resend visitor auto-reply error:', {
            name: visitorError.name,
            message: visitorError.message,
          });
        } else {
          console.log('Visitor auto-reply accepted by Resend:', {
            id: visitorResult?.id,
          });
        }
      } catch (autoReplyError) {
        console.error('Visitor auto-reply failed:', autoReplyError.message);
      }
    }

    // 6. Return success to frontend
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
      timestamp,
    });
  } catch (error) {
    console.error('Contact Email Dispatch Failure:', {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    });
  }
};
