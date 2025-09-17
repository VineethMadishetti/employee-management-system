# 🔧 Setup Guide - Forgot Password Functionality

This guide will help you set up the forgot password functionality for the JALA Academy Employee Management System.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Gmail account (for sending reset emails)

## 🚀 Step-by-Step Setup

### 1. Create Environment Variables File

Create a `.env` file in the `server` directory with the following content:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/employee-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Email Configuration (for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

### 2. Gmail App Password Setup

To send reset emails, you need to set up an App Password for Gmail:

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to **Google Account Settings** → **Security**
3. Under **2-Step Verification**, click **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "JALA Academy" as the name
6. Copy the generated 16-character password
7. Use this password as `EMAIL_PASS` in your `.env` file

### 3. Update Email Configuration

Replace the following in your `.env` file:
- `your-email@gmail.com` → Your actual Gmail address
- `your-app-password` → The 16-character app password from step 2

### 4. Start the Application

#### Backend Server
```bash
cd server
npm install
npm start
```

#### Frontend Development Server
```bash
cd client
npm install
npm run dev
```

## 🧪 Testing the Forgot Password Flow

### 1. Test Forgot Password Request
1. Go to `http://localhost:5173/login`
2. Click "Forgot Password?"
3. Enter a registered email address
4. Click "Send Reset Link"
5. Check your email for the reset link

### 2. Test Password Reset
1. Click the reset link in your email
2. Enter a new password (minimum 6 characters)
3. Confirm the password
4. Click "Reset Password"
5. You should be redirected to the login page

## 🔧 Troubleshooting

### Common Issues

#### 1. "Error sending email"
- **Cause**: Incorrect email credentials or app password
- **Solution**: Double-check your Gmail credentials and app password

#### 2. "User not found"
- **Cause**: Email address not registered in the system
- **Solution**: Make sure the email exists in your database

#### 3. "Invalid or expired token"
- **Cause**: Token has expired or is invalid
- **Solution**: Request a new reset link

#### 4. MongoDB Connection Issues
- **Cause**: MongoDB not running or incorrect connection string
- **Solution**: Start MongoDB and check the MONGO_URI

### Debug Steps

1. **Check Server Logs**: Look for error messages in the terminal
2. **Verify Environment Variables**: Ensure all required variables are set
3. **Test Email Credentials**: Try sending a test email manually
4. **Check Database**: Verify the user exists in MongoDB

## 📧 Email Template Customization

The reset email template can be customized in `server/routes/userRoutes.js`:

```javascript
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Request - JALA Academy',
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">JALA Academy - Password Reset</h2>
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Click the button below to create a new password:</p>
            <a href="http://localhost:5173/reset-password/${token.token}" 
               style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
            </a>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <br>
            <p>Best regards,<br>JALA Academy Team</p>
        </div>
    `,
};
```

## 🔒 Security Features

- **Token Expiration**: Reset tokens expire after 1 hour
- **One-time Use**: Tokens are deleted after successful password reset
- **Password Validation**: Minimum 6 characters required
- **Email Verification**: Only registered emails can request resets

## 🚀 Production Deployment

For production deployment, update the following:

1. **Email Service**: Consider using a professional email service like SendGrid or AWS SES
2. **Domain**: Update the reset link URL to your production domain
3. **Security**: Use strong, unique JWT secrets
4. **Environment**: Set NODE_ENV=production

## 📞 Support

If you encounter any issues:

1. Check the server logs for error messages
2. Verify all environment variables are correctly set
3. Ensure MongoDB is running and accessible
4. Test the email configuration with a simple test

---

**Note**: This setup guide assumes you're using Gmail. For other email providers, adjust the nodemailer configuration accordingly.
