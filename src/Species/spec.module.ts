import { Module } from '@nestjs/common';
import { speciesController } from './spec.controller';
import { speciesService } from './spec.service';
import { MongooseModule } from '@nestjs/mongoose';
import { speciesSchema } from './spec.model';




@Module({
  imports: [MongooseModule.forFeature([{ name: 'species', schema: speciesSchema }])],
  controllers: [speciesController],
  providers: [speciesService]
})
export class speciesModule { }