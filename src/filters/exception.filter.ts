import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import GqlError, { ErrorType } from '../helpers/error-handler.helper';

@Catch()
export class ExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, _: ArgumentsHost) {
    console.log(exception);

    if (exception instanceof BadRequestException) {
      return GqlError(exception.message, ErrorType.BAD_REQUEST);
    }

    if (exception instanceof ConflictException) {
      return GqlError(exception.message, ErrorType.CONFLICT);
    }

    return GqlError(exception.message, ErrorType.INTERNAL_SERVER_ERROR);
  }
}
