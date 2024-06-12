import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    return await this.petService.create(createPetDto);
  }

  @Get()
  async findAll() {
    return await this.petService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.petService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return await this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.petService.remove(id);
  }
}
