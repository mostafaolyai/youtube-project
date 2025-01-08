import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

export interface ErrorType {
  code: string;
  status: number;
}

export const ErrorType = {
  BAD_REQUEST: {
    code: ApolloServerErrorCode.BAD_REQUEST,
    status: 400,
  },
  CONFLICT: {
    code: 'CONFLICT',
    status: 409,
  },
  INTERNAL_SERVER_ERROR: {
    code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    status: 500,
  },
};

export default (message: string, type: ErrorType) => {
  throw new GraphQLError(message, {
    extensions: {
      code: type.code,
      http: {
        status: type.status,
      },
    },
  });
};
