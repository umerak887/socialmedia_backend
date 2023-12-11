import transporter from "../controller/config/emailConfig.js";

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
