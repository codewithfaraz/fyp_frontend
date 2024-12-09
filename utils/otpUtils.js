const nodemailer = require('nodemailer');

// Function to generate a 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Function to send OTP to the provided email
async function sendOTP(email) {
    const otp = generateOTP();

    // Configure the email transport using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password' // Your email password or app password
        }
    });

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return otp; // Return the generated OTP
}

module.exports = { sendOTP };
