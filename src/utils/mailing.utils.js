import { createTransport } from "nodemailer";
import __dirname from "../../utils.js"
import enviroment from "./envs.utils.js"
import argsUtils from "./args.utils.js";

const {GOOGLE_EMAIL , GOOGLE_PASSWORD, PORT} = enviroment

async function sendEmail(data){
    try {
        const trasport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: GOOGLE_EMAIL , pass: GOOGLE_PASSWORD}
        }) 
        await trasport.verify()
        const port = argsUtils.p || PORT || 8000
        await trasport.sendMail({
            from: GOOGLE_EMAIL,
            to: data.to,
            subject: `${data.name.toUpperCase()} VERIFY YOUR EMAIL`,
            html:
            `
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
                            <a href="http://localhost:${port}/api/sessions/verify?email=${data.to}&code=${data.verifyCode}" style="background-color: #FD9843; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">VERIFY EMAIL</a>
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
            `

            /*
            `
            <h1>HELLO ${data.name}</h1>
            <p>Click here for verify your email</p>
            <a href="http://localhost:${port}/api/sessions/verify?email=${data.to}&code=${data.verifyCode}">VERIFY</a>
            `*/
        })
    } catch (error) {
        throw error;
    }
}

export default sendEmail
