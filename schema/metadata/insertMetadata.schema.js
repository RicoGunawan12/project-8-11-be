export const insertMetadataSchema = {
  slug: {
    isString: {
      errorMessage: "Slug should be a valid string",
    },
    notEmpty: {
      errorMessage: "Slug is required",
    },
  },
  title: {
    isString: {
      errorMessage: "Title should be a valid string",
    },
    notEmpty: {
      errorMessage: "Title is required",
    },
  },
  description: {
    isString: {
      errorMessage: "Description should be a valid string",
    },
    notEmpty: {
      errorMessage: "Description is required",
    },
  },
  keywords: {
    isString: {
      errorMessage: "Keywords should be a valid string",
    },
    notEmpty: {
      errorMessage: "Keywords is required",
    },
  },
};
