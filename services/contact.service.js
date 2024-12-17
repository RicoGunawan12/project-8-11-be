import { where } from "sequelize";
import Contact from "../models/contact.model.js"


export const getContactService = async () => {
    const contacts = await Contact.findAll();
    return contacts;
}

export const updateContactService = async (id, contact, contactAccount) => {
    const updatedContact = await Contact.update(
        { 
            contact: contact,
            contactAccount: contactAccount
        },
        {
            where: {
                contactId: id
            }
        }
    )

    if (updatedContact[0] === 0) {
        throw new Error("There is no changes or contact");
    }
    return updatedContact
}

export const createContactService = async (contact, contactAccount, contactImage) => {
    const createdContact = await Contact.create({ contact, contactAccount, contactImage });
    return createdContact
}

export const deleteContactService = async (id) => {
    const deletedContact = await Contact.destroy({ where: { contactId: id }});
    if (deletedContact === 0) {
        throw new Error("There is no contact");
    }
    return deletedContact;
}

export const migrateContactService = async () => {
    try {
        const contacts = await getContactService();
        if (contacts.length === 0) {
            const body = [
                {
                    contact: "Facebook",
                    contactAccount: "https://www.facebook.com/profile.php?id=61561076315820&mibextid=LQQJ4d"
                },
                {
                    contact: "Instagram",
                    contactAccount: "https://www.instagram.com/tyesoofficialshop"
                },
                {
                    contact: "Pinterest",
                    contactAccount: "https://www.pinterest.com/tyesoofficialshop/"
                },
                {
                    contact: "Youtube",
                    contactAccount: "https://www.youtube.com/@TYESOOfficialShop-001"
                },
            ]
            Contact.bulkCreate(body);
        }
        console.log("Migrate contact success!");
    } catch (error) {
        
    }
}