import nodemailer from 'nodemailer'
import {
  generateAdminNotificationEmail,
  generateVisitorAutoReplyEmail,
} from '../utils/emailTemplates.js'

export const sendContactEmail = async (req, res) => {
  const timestamp = new Date().toISOString()
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'

  try {
    const { name, email, subject, message } = req.body

    // 1. Validation check for required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.',
      })
    }

    const recipient = process.env.RECIPIENT_EMAIL || 'vikashkumar161012@gmail.com'
    const smtpUser = process.env.SMTP_USER || 'sirjii045@gmail.com'
    const smtpPass = process.env.SMTP_PASS

    if (!smtpUser || !smtpPass) {
      console.error('Contact Email Dispatch Error: SMTP credentials missing in server/.env.')
      return res.status(500).json({
        success: false,
        message: 'Server email configuration error. Please ensure SMTP credentials are set in .env file.',
      })
    }

    // Strip spaces from Google App Password
    const cleanPass = smtpPass.replace(/\s+/g, '')

    // Create fresh Nodemailer transporter per request to prevent stale socket connections
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: cleanPass,
      },
    })

    // 2. Generate HTML & Plain text content for Admin Notification
    const adminHtml = generateAdminNotificationEmail({
      name,
      email,
      subject,
      message,
      ip,
      timestamp,
    })

    const adminText = `
New Inquiry from ${name}:
Email: ${email}
Subject: ${subject}
Date: ${timestamp}

Message:
${message}
    `

    // 3. Dispatch Executive Notification Email to Vikash (Admin)
    const adminResult = await transporter.sendMail({
      from: `"Vikash Portfolio Contact" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `📬 [Portfolio Inquiry] ${subject} - from ${name}`,
      text: adminText,
      html: adminHtml,
    })

    console.log(`[${new Date().toLocaleTimeString()}] ✅ Admin notification email delivered to ${recipient} (Message ID: ${adminResult.messageId})`)

    // 4. Send Confirmation & Auto-Reply Receipt to Visitor (if email is different or enabled)
    const sendAutoReply = process.env.SEND_AUTOREPLY !== 'false'
    if (sendAutoReply) {
      try {
        const visitorHtml = generateVisitorAutoReplyEmail({ name, subject, message })
        const visitorResult = await transporter.sendMail({
          from: `"Vikash Kumar" <${smtpUser}>`,
          to: email,
          subject: `Thank you for reaching out! — Vikash Kumar`,
          html: visitorHtml,
        })
        console.log(`[${new Date().toLocaleTimeString()}] 📩 Auto-reply receipt delivered to ${email} (Message ID: ${visitorResult.messageId})`)
      } catch (autoReplyErr) {
        console.warn('Auto-reply dispatch warning (admin notification succeeded):', autoReplyErr.message)
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Vikash will get back to you shortly.',
      timestamp,
    })
  } catch (error) {
    console.error('Contact Email Dispatch Failure:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to dispatch email via SMTP. Please check server configuration or try again later.',
    })
  }
}
