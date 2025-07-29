import { NotFoundException } from '@nestjs/common';

export function mustExist<T>(value: T | null | undefined, message = 'Not found'): T {
  if (value === null || value === undefined) {
    throw new NotFoundException(message);
  }
  return value;
}
