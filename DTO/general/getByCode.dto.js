export const getByCode = {
  code: {
    isString: true,
    notEmpty: {
      errorMessage: 'Code is required',
    },
  }
}