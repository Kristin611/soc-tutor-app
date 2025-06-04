import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import * as nodemailer from 'nodemailer'; 


const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PW,
  },
});



export const sendMail = async (mailOptions, callback) => {
    try {
        //mail will be sent here 
        const details = await transporter.sendMail(mailOptions);
        //pass the details to the function
        callback(details)
    } catch (error) {
        console.log(error);
    }
}
