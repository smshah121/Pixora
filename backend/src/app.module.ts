import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { SavedItemsModule } from './saved-items/saved-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { SavedItem } from './saved-items/entities/saved-item.entity';
import { Collections } from './collection/entities/collection.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 5433,
      type: "postgres",
      username: "postgres",
      password: "SmShah@12345",
      host: "localhost",
      database:"pixorabackend",
      synchronize: true,
      entities: [User,SavedItem,Collections]
    }),
    ConfigModule.forRoot({
      isGlobal: true, // very important
    }),
    
    UserModule, CollectionModule, SavedItemsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
