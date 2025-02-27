import { SMTPClient } from "emailjs";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import LanguageEnum from "../enums/lang.enum.js";
import EmailTemplate from "../models/emailTemplate.model.js";

export const sendEmailService = async (
  email,
  name,
  topic,
  orderNumber,
  message
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  console.log(process.env.SEND_TO)

  const mailOptions = {
    from: process.env.USER,
    to: process.env.SEND_TO,
    subject: "Feedback Received",
    html:
      `
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
                  ` +
      (orderNumber
        ? `<p><strong>Order Number:</strong> ${orderNumber}</p>`
        : "") +
      `
                  <p><strong>Feedback:</strong></p>
                  <p>${message}</p>
                  <p>Please review and take any necessary actions.</p>
                  <p>Best regards, ${name}<br></p>
              </div>
              <div class="footer">
                  <p>&copy; 2025 Tyeso. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
      `,
  };



  const result = await transporter.sendMail(mailOptions);
};

export const getEmailTemplateService = async (key) => {
  const emailTemplate = await EmailTemplate.findOne({
    where: {
      key: key,
    },
  });

  return emailTemplate;
};

export const updateEmailTemplateService = async (key, title, content, lang) => {
  const existingEmailTemplate = await getEmailTemplateService(key);

  let dataToBeInserted = {
    key: key,
  };

  if (lang === LanguageEnum.ENGLISH) {
    dataToBeInserted.titleEng = title;
    dataToBeInserted.contentEng = content;

    dataToBeInserted.titleIndo = existingEmailTemplate
      ? existingEmailTemplate.titleIndo
      : "";
    dataToBeInserted.contentIndo = existingEmailTemplate
      ? existingEmailTemplate.contentIndo
      : "";
  } else if (lang === LanguageEnum.INDONESIA) {
    dataToBeInserted.titleIndo = title;
    dataToBeInserted.contentIndo = content;

    dataToBeInserted.titleEng = existingEmailTemplate
      ? existingEmailTemplate.titleEng
      : "";
    dataToBeInserted.contentEng = existingEmailTemplate
      ? existingEmailTemplate.contentEng
      : "";
  } else {
    dataToBeInserted.titleEng = existingEmailTemplate
      ? existingEmailTemplate.titleEng
      : "";
    dataToBeInserted.titleIndo = existingEmailTemplate
      ? existingEmailTemplate.titleIndo
      : "";
    dataToBeInserted.contentEng = existingEmailTemplate
      ? existingEmailTemplate.contentEng
      : "";
    dataToBeInserted.contentIndo = existingEmailTemplate
      ? existingEmailTemplate.contentIndo
      : "";
  }

  const status = await EmailTemplate.upsert(dataToBeInserted, {
    fields: ["titleEng", "titleIndo", "contentEng", "contentIndo"],
  });

  return status;
};

export const sendEmailPostRegister = async (email, name, lang) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const postRegisterEmailTemplate = await getEmailTemplateService(
    "post-register"
  );
  const title =
    (lang === "id"
      ? postRegisterEmailTemplate.titleIndo
      : postRegisterEmailTemplate.titleEng) ??
    "Selamat Datang, Rekan Baru Tyeso Indonesia";
  let content =
    (lang === "id"
      ? postRegisterEmailTemplate.contentIndo
      : postRegisterEmailTemplate.contentEng) ?? "";
  content = content.replaceAll("{{ username }}", name);
  content = content.replaceAll("{{ useremail }}", email);

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: title,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
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
            <div class="content">
                ${content}
            </div>
            <hr>
            <div class="footer">
                <p style="text-align:center;">Email ini dibuat secara otomatis. Mohon untuk tidak mengirimkan balasan ke email ini.</p>
            </div>
        </body>
        </html>
        `,
  };

  const result = await transporter.sendMail(mailOptions);
};

export const sendEmailPostPayment = async (email, name, lang, transaction) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const postPaymentEmailTemplate = await getEmailTemplateService(
    "post-payment"
  );

  const productHtmlTemplate = `
    <tr>
      <td style="display: flex; flex-direction: row; align-items: center; padding: 0.5rem; gap: 1rem">
        <div style="border: 1px solid black;">
          <img src="{{ productimageurl }}" alt="" width="120" height="120">
        </div>
        <div>
          <div>
            {{ productname }}
          </div>
          <div style="font-style: italic;">
            {{ productvariant }}
          </div>
        </div>
      </td>
      <td class="align-middle" style="text-align: center;">
        <div>
          {{ productprice }}
        </div>
      </td>
    </tr>
  `;

  let title =
    (lang === "id"
      ? postPaymentEmailTemplate.titleIndo
      : postPaymentEmailTemplate.titleEng) ??
    `Order #${transaction.readableId}: Terima Kasih Sudah Berbelanja di TYESO Indonesia`;

  title = title.replaceAll("{{ Order ID }}", transaction.readableId);

  const orderDate = new Date(transaction.transactionDate);
  const printedDate = `${orderDate.getDate().toString().padStart(2, "0")}-${(orderDate.getMonth() + 1).toString().padStart(2, "0")}-${orderDate.getFullYear()} ${orderDate.getHours().toString().padStart(2, "0")}:${orderDate.getMinutes().toString().padStart(2,"0")}`;
  
  let content =
    (lang === "id"
      ? postPaymentEmailTemplate.contentIndo
      : postPaymentEmailTemplate.contentEng) ?? "";
  content = content.replaceAll("{{ nama }}", name);
  content = content.replaceAll("{{ Order ID }}", transaction.readableId);
  content = content.replaceAll("{{ Tanggal dan waktu pemesanan }}", printedDate);
  content = content.replaceAll("{{ Harga total transaksi }}", transaction.totalPrice);
  content = content.replaceAll("{{ Jasa ekspedisi yang dipakai }}", `${transaction.expedition} - ${transaction.shippingType}`);

  let printedProductsHtml = '';
  for (const detail of transaction.transaction_details) {
    let printedProductHtml = '';
    printedProductHtml = productHtmlTemplate;
    printedProductHtml = printedProductHtml.replaceAll("{{ productimageurl }}", `${process.env.BASE_URL}${detail.product_variant.product.product_covers[0].productCover ?? ""}`);
    printedProductHtml = printedProductHtml.replaceAll("{{ productname }}", detail.product_variant.product.productName);
    printedProductHtml = printedProductHtml.replaceAll("{{ productvariant }}", `${detail.product_variant.productVariantCode} - ${detail.product_variant.productColor}`);
    printedProductHtml = printedProductHtml.replaceAll("{{ productprice }}", detail.paidProductPrice);
    printedProductsHtml = printedProductsHtml + printedProductHtml;
  }

  content = content.replaceAll("{{ products }}", printedProductsHtml);
  content = content.replaceAll("{{ link }}", `${process.env.PRODUCTION_WEB}/transactions/${transaction.transactionId}`);

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: title,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
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
            <div class="content">
                ${content}
            </div>
            <hr>
            <div class="footer">
                <p style="text-align:center;">Email ini dibuat secara otomatis. Mohon untuk tidak mengirimkan balasan ke email ini.</p>
            </div>
        </body>
        </html>
        `,
  };

  const result = await transporter.sendMail(mailOptions);
}