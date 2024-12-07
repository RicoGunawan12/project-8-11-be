export const faqSchema = {
    faqQuestion: {
      isString: {
        errorMessage: 'FAQ question must be a valid string',
      },
      notEmpty: {
        errorMessage: 'FAQ question is required',
      },
    },
    faqAnswer: {
      isString: {
        errorMessage: 'FAQ answer must be a valid string',
      },
      notEmpty: {
        errorMessage: 'FAQ answer is required',
      },
    },
  };
  