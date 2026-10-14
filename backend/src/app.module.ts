import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset/entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Adzdzikri123',
      database: 'asset_fumindo',
      entities: [Asset],
      synchronize: true,
    }),
  AssetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
