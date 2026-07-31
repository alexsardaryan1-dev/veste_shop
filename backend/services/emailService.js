// imports the configured Nodemailer tranpsorter (a transporter is an object that knows how to connect to an email provider (Gmail, Outlook, SMTP server and so on))

import transporter from "../src/config/email.js";
import { verificationEmailTemplate } from "../templates/emails/verificationEmail.js";
import { resetPasswordEmailTemplate } from "../templates/emails/resetPasswordEmail.js";

// it sends the verification code to the use while registering

export const sendVerificationEmail = async (email, name, code) => {
    try {

        // here we have the data we send to the user from our company

        const mailOptions = {
            from: `"VESTE" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - VESTE",
            html: verificationEmailTemplate(name, code)
        };

        // we send the email and wait for the response

        const info = await transporter.sendMail(mailOptions);

        // process.env is a built-in Node.js object, env is a property of PROCESS that contains all environment variables, to access a variable from .env, use: process.env.VARIABLE_NAME

        if (process.env.NODE_ENV === "development") {
            console.log(`Email sent to ${email}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Email service error:", error.message);
        return { success: false };
    }
};

export const sendResetPasswordEmail = async (email, name, code) => {
    try {
        const mailOptions = {
            from: `"VESTE" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Your Password - VESTE",
            html: resetPasswordEmailTemplate(name, code)
        };

        const info = await transporter.sendMail(mailOptions);

        // NODE_ENV is an environment variable that tells your application what environment it is running in.
        // development → you're working on your own computer.
        // production → the application is live and users are using it.

        if (process.env.NODE_ENV === "development") {
            console.log(`Email sent to ${email}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Email service error:", error.message);
        return { success: false };
    }
};