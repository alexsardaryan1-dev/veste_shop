import transporter from "../src/config/email.js";
import { verificationEmailTemplate } from "../templates/emails/verificationEmail.js";
import { resetPasswordEmailTemplate } from "../templates/emails/resetPasswordEmail.js";

export const sendVerificationEmail = async (email, name, code) => {
    try {
        const mailOptions = {
            from: `"VESTE" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - VESTE",
            html: verificationEmailTemplate(name, code)
        };

        const info = await transporter.sendMail(mailOptions);
        
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
        
        if (process.env.NODE_ENV === "development") {
            console.log(`Email sent to ${email}`);
        }
        
        return { success: true };

    } catch (error) {
        console.error("Email service error:", error.message);
        return { success: false };
    }
};