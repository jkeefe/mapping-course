import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_FROM, APP_URL } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function sendMagicLink(email, token) {
  const link = `${APP_URL}/api/verify?token=${token}`;

  await resend.emails.send({
    from: RESEND_FROM,
    to: email,
    subject: 'Your access link — Mapping & Protomaps course',
    html: `
      <p>Hi there,</p>
      <p>Here's your access link for the <strong>Mapping & Protomaps</strong> course:</p>
      <p style="margin: 24px 0;">
        <a href="${link}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Access My Course
        </a>
      </p>
      <p>This link will log you in automatically. You can use it from any device or browser.</p>
      <p>If you need a new link in the future, visit <a href="${APP_URL}/access">${APP_URL}/access</a> and enter this email address.</p>
      <p>Happy mapping!</p>
    `
  });
}
