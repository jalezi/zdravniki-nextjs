import { ApiError } from 'next/dist/server/api-utils';

export function isError(exception) {
  return exception instanceof Error;
}

export function getExceptionStatus(exception) {
  return exception instanceof ApiError ? exception.statusCode : 500;
}

export function getExceptionMessage(exception) {
  return isError(exception) ? exception.message : `Internal Server Error`;
}

export function getExceptionStack(exception) {
  return isError(exception) ? exception.stack : undefined;
}
