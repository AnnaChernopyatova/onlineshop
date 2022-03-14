import { Module } from '@nestjs/common';

import { SeedingService } from '@shop-storage/seeding/seeding.service';

@Module({
  providers: [SeedingService],
  exports: [SeedingService],
})
export class SeedingModule {}
