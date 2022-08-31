const { response } = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');


const sendMail = (req, res = response) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_CLIENT,
            pass: process.env.PASSWORD_EMAIL_CLIENT
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_CLIENT,
        to: process.env.EMAIL_ADMIN,
        subject: req.body.subject,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: 'Contacte con el administrador'
            })
        } else {
            res.status(200).json({
                ok: true,
                message: 'Correo enviado correctamente'
            })
        }
    });
}

module.exports = {
    sendMail
};