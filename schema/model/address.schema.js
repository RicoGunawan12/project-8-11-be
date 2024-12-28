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
  addressDetail: {
    notEmpty: {
      errorMessage: "Address Detail is required",
    },
  },
};
