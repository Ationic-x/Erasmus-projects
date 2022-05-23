require('dotenv').config()

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ationicxeno@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})

function Send (email, uuid) {
  return transporter.sendMail({
    from: 'ationicxeno@gmail.com',
    to: email,
    subject: 'Confirmation mail',
    text: `Your API Key: ${uuid}`
  })
}

module.exports.Send = Send
