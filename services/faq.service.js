import FAQ from "../models/faq.model.js"

export const getAllFAQService = async () => {
    const FAQs = await FAQ.findAll();
    return FAQs;
}

export const createFAQService = async (faqQuestion, faqAnswer) => {
    const createdFAQ = await FAQ.create({ faqQuestion, faqAnswer });
    return createdFAQ;
}

export const deleteFAQService = async (faqId) => {
    const deletedFAQ = await FAQ.destroy({
        where: { faqId }
    });
    return deletedFAQ;
}

export const updateFAQService = async (faqId, faqQuestion, faqAnswer) => {
    const faq = FAQ.findOne({ faqId });
    if (!faq) {
        throw new Error(`FAQ not found!`);
    }
    
    await FAQ.update(
        { 
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer
        },
        { where: { faqId: faqId } }
    );

    return { message: 'FAQ updated successfully' };
}