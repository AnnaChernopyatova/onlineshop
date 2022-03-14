import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  constructor() {
    super('Input was not validated', HttpStatus.BAD_REQUEST);
  }
}

export class CreationError extends HttpException {
  constructor() {
    super(`Item was not created`, HttpStatus.BAD_REQUEST);
  }
}

export class UpdatingError extends HttpException {
  constructor() {
    super(`Item was not updated`, HttpStatus.BAD_REQUEST);
  }
}

export class DeletingError extends HttpException {
  constructor() {
    super(`Item was not deleted`, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends HttpException {
  constructor(item: string) {
    super(`${item} not found`, HttpStatus.NOT_FOUND);
  }
}
