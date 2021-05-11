import nodemailer from 'nodemailer';

async function sendEmail(to: string, html: string) {
  const testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return await transporter.sendMail({
    from: '"notReddit" donotreply@notreddit.website',
    to: to,
    subject: 'Password reset',
    html,
  });
}

export default sendEmail;
