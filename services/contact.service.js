import { where } from "sequelize";
import Contact from "../models/contact.model.js"
import ContactToSend from "../models/contactToSend.model.js";


export const getContactService = async () => {
    const contacts = await Contact.findAll();
    return contacts;
}

export const updateContactService = async (id, contact, contactAccount, contactImage) => {
    const updatedContact = await Contact.update(
        {
            contact: contact,
            contactAccount: contactAccount,
            contactImage: contactImage
        },
        {
            where: {
                contactId: id
            }
        }
    )

    // if (updatedContact[0] === 0) {
    //     throw new Error("There is no changes or contact");
    // }
    return updatedContact
}

export const createContactService = async (contact, contactAccount, contactImage) => {
    const createdContact = await Contact.create({ contact, contactAccount, contactImage });
    return createdContact
}

export const deleteContactService = async (id) => {
    const deletedContact = await Contact.destroy({ where: { contactId: id } });
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
                    contactAccount: "https://www.facebook.com/profile.php?id=61561076315820&mibextid=LQQJ4d",
                    contactImage: "/assets/contact/Facebook.png"
                },
                {
                    contact: "Instagram",
                    contactAccount: "https://www.instagram.com/tyesoofficialshop",
                    contactImage: "/assets/contact/Instagram.png"
                },
                {
                    contact: "Pinterest",
                    contactAccount: "https://www.pinterest.com/tyesoofficialshop/",
                    contactImage: "/assets/contact/Pinterest.png"
                },
                {
                    contact: "Youtube",
                    contactAccount: "https://www.youtube.com/@TYESOOfficialShop-001",
                    contactImage: "/assets/contact/Youtube.png"
                },
            ]
            Contact.bulkCreate(body);
        }

        const contactToSend = await getContactToSendService();
        if (!contactToSend) {
            const body = {
                email: "tyeso@gmail.com",
                phone: "628123456788"
            }
            ContactToSend.create(body);
        }
 
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getContactToSendService = async () => {
    const contactToSend = await ContactToSend.findAll();
    return contactToSend[0];
}

export const updateContactToSendService = async (id, email, phone) => {
    const updatedContact = await ContactToSend.update(
        {
            email: email,
            phone: phone
        },
        {
            where: {
                contactId: id
            }
        }
    )

    if (updatedContact[0] === 0) {
        throw new Error("There is no change or contact");
    }

}