import nodemailer from 'nodemailer';

async function sendEmail(to: string, html: string) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'nwm5sm55zk5vjsll@ethereal.email', // hardcoded for now
      pass: 'SWgBcVZGQUhTz16QqX',
    },
  });

  const info = await transporter.sendMail({
    from: '"Reddit-Clone" notreddit@redditclone.com',
    to: to,
    subject: 'Forgot Password',
    html,
  });

  console.log(info);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export default sendEmail;
