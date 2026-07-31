import nodemailer from "nodemailer";
// we need to import the Nodemailer package which is a library that allows Node.js backend to send emails. 
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// createTransport() creates an object that knows how to send emails. Transporter as an email delivery service which stores all the imformation needed to connect an email provider. 
// here we choose GMAIL as our email provider, Nodemailer already knows Gmail's SMTP settings, so you we don't need to configure them manually.

transporter.verify((error, success) => {
    if (error) {
        console.error("Email config error:", error.message);
    } else {
        console.log("Email service ready:", success);
    }
});

// verify() only checks that my Nodemailer configuration can successfully connect to Gmail.

export default transporter;