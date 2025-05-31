const nodemailer = require('nodemailer');
ejs = require('ejs');
require("dotenv").config();

var transport = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const emailTypeMapper = {
    confirmation: {
        subject: 'Konfirmasi Email',
        templete: '/templetes/confirmation.ejs',
    },
    password: {
        subject: 'Reset password',
        templete: '/templetes/password.ejs',
    }
}

const sendEmail = (receiver, type, content) => {
    const emailType = emailTypeMapper[type];

    ejs.renderFile(__dirname + emailType.templete, { name: receiver, content }, (err, data) => {
        if (err) {
        } else {
            var mailOption = {
                from: process.env.EMAIL_USERNAME,
                to: receiver,
                subject: emailType.subject,
                html: data
            }


            transport.sendMail(mailOption, (error, info) => {
                if (error) {
                    return console.log("sent mail", error);
                }
            });
        }
    });
}

module.exports = {
    sendEmail
}
