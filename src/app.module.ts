import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { characterModule } from './characters/char.module';
import { speciesModule} from './species/spec.module'; 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [characterModule, speciesModule, MongooseModule.forRoot('mongodb+srv://AbbyIsOnAtlas:aksjdf3u8@cluster0.e5gaho1.mongodb.net/test')],
  controllers: [AppController], // control how you handle incoming requests 
  providers: [AppService], // extra classes which you can inject into controllers or another provider 
})
export class AppModule {}
