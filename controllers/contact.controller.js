import { createContactService, deleteContactService, getContactService, updateContactService } from "../services/contact.service.js";


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

    if (!contact) {
        return res.status(400).json({ message: "Contact is required!" });
    }
    else if (!contactAccount) {
        return res.status(400).json({ message: "Contact account is required!" });
    }

    try {
        const contacts = await createContactService(contact, contactAccount);
        return res.status(200).json({ message: "Contact created!", contacts, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateContact = async (req, res) => {
    const { contact, contactAccount } = req.body;
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

    try {
        const contacts = await updateContactService(id, contact, contactAccount);
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
        return res.status(200).json({ message: "Contact deleted!", contacts, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}