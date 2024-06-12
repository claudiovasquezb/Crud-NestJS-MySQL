import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
