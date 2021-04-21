import { PostInput } from '../resolvers/post';

export const validatePost = (input: PostInput) => {
  const { title, text } = input;

  if (!title) {
    return [
      {
        field: 'title',
        message: 'You must include a title',
      },
    ];
  }
  if (title.length < 5) {
    return [
      {
        field: 'title',
        message: 'Title must be more than 5 characters',
      },
    ];
  }

  if (!text) {
    return [
      {
        field: 'text',
        message: 'Some text is required',
      },
    ];
  }

  return null;
};
