import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RestModule } from '@shop-rest/rest.module';
import { SeedingModule } from '@shop-storage/seeding/seeding.module';
import { SeedingService } from '@shop-storage/seeding/seeding.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: Number(configService.get<number>('TYPEORM_PORT')),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        synchronize: false,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    RestModule,
    SeedingModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
