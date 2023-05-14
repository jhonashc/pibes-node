import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  sendEmail(mailOptions: MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
