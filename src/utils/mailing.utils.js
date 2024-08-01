import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import enviroment from "./envs.utils.js";
import argsUtils from "./args.utils.js";

const { GOOGLE_EMAIL, GOOGLE_PASSWORD, PORT } = enviroment;

class Mailing {
  constructor() {
    this.transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    this.port = argsUtils.p || PORT || 8000;
  }
  sendVerifyEmail = async (data) => {
    try {
      await this.transport.verify(); //<- verifica que la conexion con el servidor de correo sea exitosa
      await this.transport.sendMail({
        from: GOOGLE_EMAIL,
        to: data.to,
        subject: `${data.name.toUpperCase()} VERIFY YOUR EMAIL`,
        html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="background-color: #FD9843; padding: 20px 0; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff;">Food Shop</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <h2 style="color: #FD9843;">Hello ${data.name},</h2>
                                <p style="font-size: 16px;">Thank you for signing up with Food Shop! Please verify your email address by clicking the button below:</p>
                                <a href="http://localhost:${this.port}/api/sessions/verify?email=${data.to}&code=${data.verifyCode}" 
                                    style="background-color: #FD9843; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">VERIFY EMAIL
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <p style="font-size: 14px; color: #777;">If you did not sign up for this account, you can ignore this email.</p>
                                <p style="font-size: 14px; color: #777;">&copy; ${new Date().getFullYear()} Food Shop. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </div>
                `,
      });
    } catch (error) {
      throw error;
    }
  };
  sendPasswordRecovery = async (data) => {
    try {
      await this.transport.verify();
      await this.transport.sendMail({
        from: GOOGLE_EMAIL,
        to: data.to,
        subject: `${data.name.toUpperCase()} RESET YOUR PASSWORD`,
        html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="background-color: #FD9843; padding: 20px 0; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff;">Food Shop</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <h2 style="color: #FD9843;">Hello ${data.name},</h2>
                                <p style="font-size: 16px;">You requested to reset your password. Please click the button below to reset your password:</p>
                                <a href="http://localhost:${this.port}/api/sessions/password?email=${data.to}&code=${data.verifyCode }" 
                                style="background-color: #FD9843; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">RESET PASSWORD</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <p style="font-size: 14px; color: #777;">If you did not request to reset your password, you can ignore this email.</p>
                                <p style="font-size: 14px; color: #777;">&copy; ${new Date().getFullYear()} Food Shop. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </div>
            `,
      });
    } catch (error) {
      throw error;
    }
  };
}

const mailing = new Mailing();

export const { sendVerifyEmail, sendPasswordRecovery } = mailing;
