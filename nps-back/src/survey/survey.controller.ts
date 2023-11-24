import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(
    @Body(new ValidationPipe())
    createSurveyDto: Record<string, string> & CreateSurveyDto,
  ) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  async findAll() {
    return this.surveyService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return this.surveyService.update(id, updateSurveyDto);
  }
}
