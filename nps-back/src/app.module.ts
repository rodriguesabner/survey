import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleSpreadsheetModule } from './google-spreadsheet/google-spreadsheet.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleSpreadsheetModule,
    SurveyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
