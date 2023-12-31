import transporter from "../config/emailConfig.js";

const RegisterEmail = async (params) => {
  const { from, to, subject, text } = params;
  const info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: `<b>${text}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
};

export default RegisterEmail;
