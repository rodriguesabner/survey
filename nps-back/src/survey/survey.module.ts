import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { GoogleSpreadsheetModule } from 'src/google-spreadsheet/google-spreadsheet.module';

@Module({
  imports: [GoogleSpreadsheetModule],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
