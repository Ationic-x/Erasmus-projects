require('dotenv').config()
const { EMAIL_PASS } = process.env

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ationicxeno@gmail.com',
      pass: EMAIL_PASS,
    }
  })


async function Send(email, uuid){
    await transporter.sendMail({
    from: 'ationicxeno@gmail.com',
    to: email,
    subject: 'Confirmation mail',
    text: `Your API Key: ${uuid}`
  })
}

module.exports.Send = Send