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

export default transporter;
