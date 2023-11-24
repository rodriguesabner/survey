import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { GoogleSpreadsheetService } from 'src/google-spreadsheet/google-spreadsheet.service';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SurveyService {
  private doc: GoogleSpreadsheet;

  constructor(
    private readonly googleSpreadSheetService: GoogleSpreadsheetService,
  ) {
    this.doc = googleSpreadSheetService.getGoogleSpreadSheetInstance();
  }

  async create(createSurveyDto: Record<string, string> & CreateSurveyDto) {
    try {
      const sheet = this.doc.sheetsByIndex[0];

      createSurveyDto.id = uuidv4();
      createSurveyDto.created_at = new Date().getTime();
      createSurveyDto.updated_at = new Date().getTime();

      await sheet.addRow(createSurveyDto);
    } catch (error) {
      throw new HttpException(
        'Error creating survey',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const sheet = this.doc.sheetsByIndex[0];
      const surveyRows = await sheet.getRows();

      if (surveyRows.length <= 0) {
        return [];
      }

      return this.transformRows(surveyRows);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error get survey',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    try {
      const sheet = this.doc.sheetsByIndex[0];
      const surveyRows = await sheet.getRows();

      const currentRow = surveyRows
        .map((row, index) => ({
          rowNumber: index,
          id: row['_rawData'][0],
        }))
        .find((row) => row.id === id);

      if (currentRow == null) {
        return new HttpException('Survey not found', HttpStatus.NOT_FOUND);
      }

      updateSurveyDto.updated_at = new Date().getTime();

      Object.keys(updateSurveyDto).forEach((key) => {
        surveyRows[currentRow.rowNumber].set(key, updateSurveyDto[key]);
      });

      await surveyRows[currentRow.rowNumber].save();
      return updateSurveyDto;
    } catch (error) {
      throw new HttpException(
        'Error updating survey',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  transformRows(rows: GoogleSpreadsheetRow[]): Record<string, any> {
    const headers = rows[0]._worksheet.headerValues;

    return rows.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row['_rawData'][index];
      });

      return obj;
    });
  }
}
