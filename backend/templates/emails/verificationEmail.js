export const verificationEmailTemplate = (name, code) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; }
            .header { background-color: #313131; color: white; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; }
            .content { padding: 20px 0; }
            .content p { color: #333; line-height: 1.6; }
            .code-box { 
                background-color: #f9f9f9; 
                border: 2px solid #313131; 
                padding: 20px; 
                text-align: center; 
                margin: 20px 0;
            }
            .code { 
                font-size: 32px; 
                font-weight: bold; 
                color: #313131; 
                letter-spacing: 3px;
            }
            .footer { 
                background-color: #f5f5f5; 
                padding: 15px; 
                text-align: center; 
                font-size: 12px; 
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>VESTE</h1>
            </div>
            
            <div class="content">
                <p>Hello <strong>${name}</strong>,</p>

                <p>Welcome to VESTE! We're excited to have you on board.</p>
                
                <p>To verify your email address and complete your registration, please use the verification code below:</p>
                
                <div class="code-box">
                    <div class="code">${code}</div>
                </div>
                
                <p>Enter this code in the app to verify your email address.</p>
                
                <p><strong>Code expires in 24 hours.</strong></p>
                
                <p>If you didn't create this account, please ignore this email.</p>
                
                <p>Best regards,<br>The VESTE Team</p>
            </div>
            
            <div class="footer">
                <p>&copy; 2024 VESTE Shop. All rights reserved.</p>
                <p>support@veste.com</p>
            </div>
        </div>
    </body>
    </html>
    `;
};