const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,

        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },

        service: process.env.EMAIL_SERVICE,
    });
    // console.log("transporter", transporter)

    const mailOptions = {
        from: process.env.EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };

    await transporter.sendMail(mailOptions);
}