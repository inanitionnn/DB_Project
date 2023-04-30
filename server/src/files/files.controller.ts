import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { createReadStream } from 'fs';

@Controller('files')
export class FilesController {
  @Get(':filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.join(process.cwd(), 'public', filename);
    const file = createReadStream(imagePath);
    file.pipe(res);
  }
}
