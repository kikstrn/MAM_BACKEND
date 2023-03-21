import { Module } from '@nestjs/common';
import { IgdbService } from './igdb.service';
import { IgdbController } from './igdb.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IgdbController],
  providers: [IgdbService]
})
export class IgdbModule {}