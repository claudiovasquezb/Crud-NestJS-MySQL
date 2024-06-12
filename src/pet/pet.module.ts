import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
