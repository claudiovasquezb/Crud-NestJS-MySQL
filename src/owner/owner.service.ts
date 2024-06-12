import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    const owner = this.ownerRepository.findOne({
      where: { id },
    });
    if (!owner) {
      throw new NotFoundException(`No se encontró dueño con ID ${id}`);
    }
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({ where: { id } });
    if (!owner) {
      throw new NotFoundException(`No se encontró dueño con ID ${id}`);
    }
    if (updateOwnerDto.name) {
      owner.name = updateOwnerDto.name;
    }
    return await this.ownerRepository.save(owner);
  }

  async remove(id: number): Promise<void> {
    const owner = await this.ownerRepository.findOne({ where: { id } });
    if (!owner) {
      throw new NotFoundException(`No se encontró dueño con ID ${id}`);
    }
    await this.ownerRepository.remove(owner);
  }
}
