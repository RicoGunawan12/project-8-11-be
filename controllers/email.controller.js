import { sendEmailService } from "../services/email.service.js";

export const sendEmail = async (req, res) => {
  const { email, name, topic, orderNumber, message } = req.body;
  
  try {
    await sendEmailService(email, name, topic, orderNumber, message);
    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}