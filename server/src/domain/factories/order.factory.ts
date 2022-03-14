import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderFactory {
  async buildOrderFromDto(dto: unknown[]) {
    return {
      ...dto,
    };
  }
}
