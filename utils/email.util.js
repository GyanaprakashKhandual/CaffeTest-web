const nodemailer = require('nodemailer');


const sendOTPEmail = async (email, otp) => {

    try {
        
        const transporter = nodemailer.createTransport({

            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const mailOptions = {
            from: `"Caffetest" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your OTP for Registration',
            text: 'You OTP is: ${otp}',
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`
        };
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Error while sending mail: ', error);
        throw error;
    }
};

module.exports = { sendOTPEmail };
