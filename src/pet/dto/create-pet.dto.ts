import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  owner_id: number;
}
