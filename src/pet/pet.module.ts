import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { OwnerModule } from 'src/owner/owner.module';
import { OwnerService } from 'src/owner/owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), OwnerModule],
  controllers: [PetController],
  providers: [PetService, OwnerService],
})
export class PetModule {}
