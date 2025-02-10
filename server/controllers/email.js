import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "jozzy7626@gmail.com",
        pass: "udfc hoss iuwi lszd",
    },
});

export function sendResetPasswordEmail(to, resetLink) {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>You requested to reset your password. Click the button below to set a new password:</p>
      <a href="${resetLink}" 
         style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none; 
         border-radius: 5px; display: inline-block;">
        Reset Password
      </a>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <p>Thanks,<br>Your App Team</p>
    </div>
  `;

    transporter.sendMail({
        from: "Your App Name" ,
        to,
        subject: 'Reset Your Password',
        html: htmlContent,
    });
}


import crypto from 'crypto';

export function generateResetToken() {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 15 * 60 * 1000); 
  return { token, expires };
}