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
  // province: {
  //   notEmpty: {
  //     errorMessage: "Province is required",
  //   },
  // },
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
  district: {
    notEmpty: {
      errorMessage: "Subdistrict ID is required",
    },
  },
  postalCode: {
    notEmpty: {
      errorMessage: "Postal code is required",
    },
  },
  addressDetail: {
    notEmpty: {
      errorMessage: "Address Detail is required",
    },
  },
  komshipAddressId: {
    notEmpty: {
      errorMessage: "Komship Address Id is required",
    },
  },
  label: {
    notEmpty: {
      errorMessage: "Address Label is required",
    },
  },
};
