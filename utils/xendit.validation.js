// import Xendit from "xendit-node"

// export const validateCreditCard = async (
//     amount,
//     card_number,
//     card_exp_month,
//     card_exp_year,
//     card_cvn,
//     is_multiple_use,
//     should_authenticate,
//     card_holder_email,
//     card_holder_first_name,
//     card_holder_last_name,
//     card_holder_phone_number
// ) => {
//     if (!amount || typeof amount !== 'number' || amount <= 0) {
//         return {status: 400, message: "Amount must be a positive number."};
//     }

//     // Validate card number using Luhn algorithm
//     if (!validator.isCreditCard(card_number)) {
//         return {status: 400, message: "Invalid card number."};
//     }

//     // Check expiration month is between 01 and 12
//     if (!card_exp_month || !/^(0[1-9]|1[0-2])$/.test(card_exp_month)) {
//         return {status: 400, message: "Invalid expiration month. Must be between 01 and 12."};
//     }

//     // Check expiration year is in the future
//     const currentYear = new Date().getFullYear();
//     if (!card_exp_year || isNaN(card_exp_year) || card_exp_year < currentYear) {
//         return {status: 400, message: "Invalid expiration year. Must be a current or future year."};
//     }

//     // Validate CVN is a 3 or 4 digit number
//     if (!/^\d{3,4}$/.test(card_cvn)) {
//         return {status: 400, message: "Invalid CVN. Must be a 3 or 4 digit number."};
//     }

//     // Validate email format
//     if (!validator.isEmail(card_holder_email)) {
//         return {status: 400, message: "Invalid email address."};
//     }

//     // Validate phone number (basic check for numeric string, you can refine this based on country)
//     if (!/^\d{10,15}$/.test(card_holder_phone_number)) {
//         return {status: 400, message: "Invalid phone number. Must be between 10 and 15 digits."};
//     }

//     return { status: 200, message: "Success!"};
// } 