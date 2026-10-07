/**
 * Generates an executive, beautifully styled HTML email notification sent to Vikash (Admin).
 */
export const generateAdminNotificationEmail = ({ name, email, subject, message, ip, timestamp }) => {
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
            
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); padding: 32px 32px 28px 32px; text-align: left;">
                <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                  INCOMING PORTFOLIO MESSAGE
                </span>
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2;">
                  New Inquiry from ${name}
                </h1>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 32px;">
                
                <!-- Sender Details Card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; border: 1px solid #334155; border-radius: 12px; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 20px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom: 10px; font-size: 13px; font-weight: 600; color: #94a3b8; width: 110px;">Sender Name:</td>
                          <td style="padding-bottom: 10px; font-size: 14px; font-weight: 700; color: #f8fafc;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 10px; font-size: 13px; font-weight: 600; color: #94a3b8;">Email Address:</td>
                          <td style="padding-bottom: 10px; font-size: 14px; font-weight: 600;">
                            <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 10px; font-size: 13px; font-weight: 600; color: #94a3b8;">Subject:</td>
                          <td style="padding-bottom: 10px; font-size: 14px; font-weight: 600; color: #f8fafc;">${subject}</td>
                        </tr>
                        <tr>
                          <td style="font-size: 13px; font-weight: 600; color: #94a3b8;">Timestamp:</td>
                          <td style="font-size: 13px; color: #cbd5e1;">${formattedDate} IST</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="margin-bottom: 28px;">
                  <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #f8fafc; text-transform: uppercase; letter-spacing: 0.5px;">
                    Message Body
                  </h3>
                  <div style="background-color: #0f172a; border-left: 4px solid #6366f1; border-top: 1px solid #334155; border-right: 1px solid #334155; border-bottom: 1px solid #334155; border-radius: 0 8px 8px 0; padding: 20px;">
                    <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>

                <!-- Call to Action Button -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);">
                        Reply Directly via Gmail →
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Footer Metadata -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid #334155; padding-top: 20px;">
                  <tr>
                    <td style="font-size: 12px; color: #64748b; text-align: center; line-height: 1.5;">
                      Origin IP: <code style="background-color: #0f172a; padding: 2px 6px; border-radius: 4px; color: #94a3b8;">${ip || '127.0.0.1'}</code> • Portfolio API v1.0
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
}

/**
 * Generates an automated receipt & acknowledgement email sent to the visitor.
 */
export const generateVisitorAutoReplyEmail = ({ name, subject, message }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Reaching Out</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
            
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); padding: 32px; text-align: left;">
                <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                  Thank You for Reaching Out!
                </h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 14px; font-weight: 500;">
                  I've received your message and will get back to you shortly.
                </p>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 32px;">
                <p style="font-size: 15px; color: #f8fafc; line-height: 1.6; margin-top: 0;">
                  Hi <strong>${name}</strong>,
                </p>
                <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
                  Thank you for visiting my portfolio and submitting an inquiry regarding <strong>"${subject}"</strong>. 
                  I typically respond to all messages within <strong>24 hours</strong>.
                </p>

                <!-- Submitted Message Summary Box -->
                <div style="margin: 24px 0; background-color: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 20px;">
                  <h4 style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: #818cf8; text-transform: uppercase; letter-spacing: 0.5px;">
                    Copy of Your Message:
                  </h4>
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #cbd5e1; italic; white-space: pre-wrap;">"${message}"</p>
                </div>

                <!-- Connect / Portfolio CTA -->
                <div style="background-color: #0f172a; border-radius: 12px; padding: 20px; border: 1px solid #334155; text-align: center; margin-bottom: 28px;">
                  <p style="margin: 0 0 14px 0; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    In the meantime, feel free to explore my latest projects & open source contributions:
                  </p>
                  <a href="https://github.com/alpha045" target="_blank" style="display: inline-block; background-color: #334155; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 8px 16px; border-radius: 6px; margin: 0 4px;">GitHub Profile</a>
                  <a href="https://www.linkedin.com/in/vikash-kumar045/" target="_blank" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 8px 16px; border-radius: 6px; margin: 0 4px;">LinkedIn Profile</a>
                </div>

                <!-- Signature Block -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid #334155; padding-top: 24px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #f8fafc;">Best regards,</p>
                      <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: 800; color: #818cf8;">Vikash Kumar</p>
                      <p style="margin: 0; font-size: 13px; color: #94a3b8;">Full Stack MERN Developer • B.Tech CSE</p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
}
