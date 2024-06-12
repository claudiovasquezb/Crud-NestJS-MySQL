import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto) {
    try {
      const pet = this.petRepository.create(createPetDto);
      return await this.petRepository.save(pet);
    } catch (error) {
      throw new HttpException(
        'No se pudo crear la mascota',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.petRepository.find();
    } catch (error) {
      throw new HttpException(
        'No se pudo encontrar las mascotas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const pet = await this.petRepository.findOneBy({ id });
      if (pet == null) {
        throw new HttpException(
          'No se pudo encontrar una mascota con ese id',
          HttpStatus.NOT_FOUND,
        );
      }
      return pet;
    } catch (error) {
      throw new HttpException(
        'No se pudo encontrar la mascota',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    try {
      const updatedPet = await this.petRepository.update(id, updatePetDto);
      console.log(updatedPet);
      if (updatedPet.affected === 0) {
        throw new HttpException(
          'No se pudo encontrar una mascota con ese id',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedPet;
    } catch (error) {
      throw new HttpException(
        'No se pudo actualizar la mascota',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedPet = await this.petRepository.delete(id);
      if (deletedPet.affected === 0) {
        throw new HttpException(
          'No se pudo encontrar una mascota con ese id',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'No se pudo actualizar la mascota',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
