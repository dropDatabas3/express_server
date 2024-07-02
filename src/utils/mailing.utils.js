import { createTransport } from "nodemailer";
import __dirname from "../../utils.js"
import enviroment from "./envs.utils.js"

const {GOOGLE_EMAIL , GOOGLE_PASSWORD} = enviroment

async function sendEmail(data){
    try {
        const trasport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: GOOGLE_EMAIL , pass: GOOGLE_PASSWORD}
        }) 
        await trasport.verify()
        await trasport.sendMail({
            from: GOOGLE_EMAIL,
            to: data.to,
            subject: `${data.name.toUpperCase()} VERIFY YOUR EMAIL`,
            html:
            `
            <h1>HELLO ${data.name}</h1>
            <p>Click here for verify your email</p>
            <a href="http://localhost:8000/api/sessions/verify?email=${data.to}&code=${data.verifyCode}">VERIFY</a>
            `
        })
    } catch (error) {
        throw error;
    }
}

export default sendEmail
