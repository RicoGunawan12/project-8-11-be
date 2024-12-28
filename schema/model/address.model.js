export const addressSchema = {
  receiverName: {
    notEmpty: {
      errorMessage: "Receiver Name is required",
    },
  },
  receiverPhoneNumber: {
    notEmpty: {
      errorMessage: "Receiver Phone Number is required",
    },
  },
  province: {
    notEmpty: {
      errorMessage: "Province is required",
    },
  },
  city: {
    notEmpty: {
      errorMessage: "City is required",
    },
  },
  subdistrict: {
    notEmpty: {
      errorMessage: "Subdistrict ID is required",
    },
  },
  postalCode: {
    isPostalCode: {
      errorMessage: "Postal Code must be a valid postal code",
    },
    notEmpty: {
      errorMessage: "Postal Code is required",
    },
  },
  addressDetail: {
    notEmpty: {
      errorMessage: "Address Detail is required",
    },
  },
};
