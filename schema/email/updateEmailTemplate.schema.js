import EmailKeyEnum from "../../enums/email.enum.js";
import LanguageEnum from "../../enums/lang.enum.js";

export const updateEmailTemplateSchema = {
  key: {
    isString: true,
    notEmpty: {
      errorMessage: 'Something wrong when updating e-mail template',
    },
    isIn: {
      options: [[EmailKeyEnum.POST_REGISTER]],
      errorMessage: 'Something wrong when updating e-mail template'
    }
  },
  title: {
    isString: true,
    notEmpty: {
      errorMessage: 'E-mail title is required',
    },
  },
  content: {
    isString: true,
    notEmpty: {
      errorMessage: 'E-mail content is required',
    },
  },
  lang: {
    isString: true,
    notEmpty: {
      errorMessage: 'Something wrong when updating e-mail template',
    },
    isIn: {
      options: [[LanguageEnum.ENGLISH, LanguageEnum.INDONESIA]],
      errorMessage: 'Something wrong when updating e-mail template'
    }
  }
};
