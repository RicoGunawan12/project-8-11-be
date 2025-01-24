import { createContactService, deleteContactService, getContactService, getContactToSendService, updateContactService, updateContactToSendService } from "../services/contact.service.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";


export const getContact = async (req, res) => {
    try {
        const contacts = await getContactService();
        return res.status(200).json({ message: "Contact fetched!", contacts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createContact = async (req, res) => {
    const { contact, contactAccount } = req.body;
    const images = req.files['contactImage'];

    if (!images) {
        return res.status(400).json({ message: "Contact image is required!" });
    }
    if (!contact) {
        return res.status(400).json({ message: "Contact is required!" });
    }
    else if (!contactAccount) {
        return res.status(400).json({ message: "Contact account is required!" });
    }
    const contactImage = `/${UPLOAD_FOLDER}contact/${images[0].filename}`

    try {
        const contacts = await createContactService(contact, contactAccount, contactImage);
        return res.status(200).json({ message: "Contact created!", contacts, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateContact = async (req, res) => {
    const { contact, contactAccount } = req.body;
    const images = req.files['contactImage'];
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Contact Id is required!" });
    }

    if (!contact) {
        return res.status(400).json({ message: "Contact is required!" });
    }
    else if (!contactAccount) {
        return res.status(400).json({ message: "Contact account is required!" });
    }

    const contactImage = `/${UPLOAD_FOLDER}contact/${images[0].filename}`

    try {
        const contacts = await updateContactService(id, contact, contactAccount, contactImage);
        return res.status(200).json({ message: "Contact updated!", contacts, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteContact = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Contact Id is required!" });
    }

    try {
        const contacts = await deleteContactService(id);
        return res.status(200).json({ message: "Contact deleted!", contacts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getContactToSend = async (req, res) => {
    try {
        const contact = await getContactToSendService();
        return res.status(200).json({ message: "Contact to send fetched!", contact });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateContactToSend = async (req, res) => {
    const { email, phone, business } = req.body;
    const id = req.params.id

    try {
        const updated = await updateContactToSendService(id, email, phone, business);
        return res.status(200).json({ message: "Contact updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}