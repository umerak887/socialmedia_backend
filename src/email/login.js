import nodemailer from "nodemailer";

const env = process.env;

var transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER, // place your user
    pass: env.EMAIL_PASS, // place user's password
  },
});

const LoginEmail = async (params) => {
  const { from, to, subject, text } = params;
  const info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: `<b>${text}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
};

export default LoginEmail;
