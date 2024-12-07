export const postSchema = {
    postTitle: {
      isString: {
        errorMessage: 'Post title must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Post title is required',
      },
    },
    postContent: {
      isString: {
        errorMessage: 'Post content must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Post content is required',
      },
    },
  };
  