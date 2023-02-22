import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
