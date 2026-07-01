export const resetPasswordEmailTemplate = (name, code) => {
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
            .warning { 
                background-color: #fff3cd; 
                border-left: 4px solid #ffc107; 
                padding: 15px; 
                margin: 20px 0;
            }
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
                
                <p>We received a request to reset your VESTE account password.</p>
                
                <p>Use the reset code below to create a new password:</p>
                
                <div class="code-box">
                    <div class="code">${code}</div>
                </div>
                
                <p>Enter this code in the app to reset your password.</p>
                
                <p><strong>Code expires in 1 hour.</strong></p>
                
                <div class="warning">
                    <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account is safe. Do not share this code with anyone.
                </div>
                
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