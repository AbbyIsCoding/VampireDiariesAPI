import { Module } from '@nestjs/common';
import { characterController } from './char.controller';
import { characterService } from './char.service';
import { MongooseModule } from '@nestjs/mongoose';
import { characterSchema } from './char.model';




@Module({
  imports: [MongooseModule.forFeature([{ name: 'character', schema: characterSchema }])],
  controllers: [characterController],
  providers: [characterService]
})
export class characterModule { }

