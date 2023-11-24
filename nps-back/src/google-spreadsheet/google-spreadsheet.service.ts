import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

@Injectable()
export class GoogleSpreadsheetService {
  private doc: GoogleSpreadsheet;

  constructor(private readonly configService: ConfigService) {
    this.initGoogleService();
  }

  private async initGoogleService() {
    const auth = new JWT({
      email: this.configService.get<string>('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
      key: this.configService.get<string>('GOOGLE_PRIVATE_KEY'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.doc = new GoogleSpreadsheet(
      this.configService.get<string>('GOOGLE_SPREADSHEET_ID'),
      auth,
    );

    await this.doc.loadInfo();
  }

  public getGoogleSpreadSheetInstance(): GoogleSpreadsheet {
    return this.doc;
  }
}
