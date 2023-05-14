import { MailOptions } from "nodemailer/lib/json-transport";

export const newUserEmailTemplate = (
  email: string,
  username: string,
  otpCode: string
): MailOptions => {
  return {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verificación de cuenta",
    text: "Verificación de cuenta",
    html: `
        <h1>Hola ${username}!</h1>
        <p><strong>${otpCode}</strong></p>
        <p>Ingrese este código en la aplicación para completar su registro.</p>
        <p>Este código expirará en 10 minutos.</p>
      `,
  };
};
