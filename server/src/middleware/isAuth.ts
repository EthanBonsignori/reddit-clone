import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
// import { FieldError } from '../utils/FieldError';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated');

    // return [
    //   {
    //     field: 'api',
    //     message: 'Not authenticated',
    //   },
    // ];
  }

  return next();
};
