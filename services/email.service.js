import { SMTPClient } from 'emailjs';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import LanguageEnum from '../enums/lang.enum.js';
import EmailTemplate from '../models/emailTemplate.model.js';


export const sendEmailService = async (email, name, topic, orderNumber, message) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
  });

  const mailOptions = {
    from:  process.env.USER,
    to: process.env.SEND_TO,
    subject: 'Feedback Received',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Feedback Received</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f9f9f9;
                  color: #000000;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header h1 {
                  margin: 0;
                  color:#000000;
              }
              .content {
                  text-align: left;
              }
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  font-size: 0.9em;
                  color: #000000;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>New Feedback Received!</h1>
              </div>
              <div class="content">
                  <p>Hello Team,</p>
                  <p>You have received a new feedback submission. Here are the details:</p>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Topic:</strong> ${topic}</p>
                  `+(orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : '')+`
                  <p><strong>Feedback:</strong></p>
                  <p>${message}</p>
                  <p>Please review and take any necessary actions.</p>
                  <p>Best regards, ${name}<br></p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Tyeso. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
      `

  };

  const result = await transporter.sendMail(mailOptions);
};

export const getEmailTemplateService = async (key) => {
    const emailTemplate = await EmailTemplate.findOne({
        where: {
            key: key
        }
    });

    return emailTemplate;
}

export const updateEmailTemplateService = async (key, title, content, lang) => {
    const existingEmailTemplate = await getEmailTemplateService(key);

    let dataToBeInserted = {
        key: key,
    }

    if (lang === LanguageEnum.ENGLISH) {
        dataToBeInserted.titleEng = title;
        dataToBeInserted.contentEng = content;

        dataToBeInserted.titleIndo = existingEmailTemplate ? existingEmailTemplate.titleIndo : "";
        dataToBeInserted.contentIndo = existingEmailTemplate ? existingEmailTemplate.contentIndo : "";
    } else if (lang === LanguageEnum.INDONESIA) {
        dataToBeInserted.titleIndo = title;
        dataToBeInserted.contentIndo = content;

        dataToBeInserted.titleEng = existingEmailTemplate ? existingEmailTemplate.titleEng : "";
        dataToBeInserted.contentEng = existingEmailTemplate ? existingEmailTemplate.contentEng : "";
    } else {
        dataToBeInserted.titleEng = existingEmailTemplate ? existingEmailTemplate.titleEng : "";
        dataToBeInserted.titleIndo = existingEmailTemplate ? existingEmailTemplate.titleIndo : "";
        dataToBeInserted.contentEng = existingEmailTemplate ? existingEmailTemplate.contentEng : "";
        dataToBeInserted.contentIndo = existingEmailTemplate ? existingEmailTemplate.contentIndo : "";
    }

    const status = await EmailTemplate.upsert(dataToBeInserted, {
        fields: ["titleEng", "titleIndo", "contentEng", "contentIndo"]
    });

    return status;
}
