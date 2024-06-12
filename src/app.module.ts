import { Module } from '@nestjs/common';
import { PetModule } from './pet/pet.module';
import { OwnerModule } from './owner/owner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true, // No usar en produccion
    }),
    PetModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
