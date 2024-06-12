import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const owner = await this.ownerRepository.findOne({
      where: { id: createPetDto.owner_id },
    });
    if (!owner) {
      throw new NotFoundException(
        `No se encontró dueño con ID ${createPetDto.owner_id}`,
      );
    }
    const pet = this.petRepository.create({
      name: createPetDto.name,
      owner,
    });
    return await this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
    });
    if (!pet) {
      throw new NotFoundException(`No se encontró mascota con ID ${id}`);
    }
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException(`No se encontró mascota con ID ${id}`);
    }
    if (updatePetDto.owner_id) {
      const owner = await this.ownerRepository.findOne({
        where: { id: updatePetDto.owner_id },
      });
      if (!owner) {
        throw new NotFoundException(
          `No se encontró dueño con ID ${updatePetDto.owner_id}`,
        );
      }
      pet.owner = owner;
    }
    if (updatePetDto.name) {
      pet.name = updatePetDto.name;
    }
    return await this.petRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException(`No se encontró mascota con ID ${id}`);
    }
    await this.petRepository.remove(pet);
  }
}
