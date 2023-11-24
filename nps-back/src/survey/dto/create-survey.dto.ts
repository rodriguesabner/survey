import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSurveyDto {
  @IsUUID()
  @IsOptional()
  @IsEmpty({
    message: 'id is auto generated',
  })
  id: string;

  @IsNotEmpty()
  @IsString()
  average: string;

  @IsNumber()
  @IsOptional()
  @IsEmpty({
    message: 'created_at is auto generated',
  })
  created_at: number;

  @IsNumber()
  @IsOptional()
  @IsEmpty({
    message: 'updated_at is auto generated',
  })
  updated_at: number;
}
