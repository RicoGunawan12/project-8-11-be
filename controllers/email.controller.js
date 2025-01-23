import { getEmailTemplateService, sendEmailService, updateEmailTemplateService } from "../services/email.service.js";


export const sendEmail = async (req, res) => {
  const { email, name, topic, orderNumber, message } = req.body;
  
  try {
    await sendEmailService(email, name, topic, orderNumber, message);
    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}

export const getEmailTemplate = async (req, res) => {
  /*
  Example endpoint request:
    /api/email-templates?key=post-register
  */
  const { key } = req.query;

  try {
    const emailTemplate = await getEmailTemplateService(key); 
    return res.status(200).json({ message: "Fetch success!", emailTemplate: emailTemplate ? emailTemplate : {} });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const updateEmailTemplate = async (req, res) => {
  /*
  Example JSON in request body:
  {
    "key": "post-register",                 // key of email that want to be updated
    "title": "Welcome to Tyeso Indonesia",
    "content": "Hello world hello world",
    "lang": "en"                            // "en" for English, "id" for Indonesia
  }
  */
  const { key, title, content, lang } = req.body;

  try {
    await updateEmailTemplateService(key, title, content, lang);
    return res.status(200).json({ message: "E-mail template updated successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}