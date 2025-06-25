import { Controller, Post, Files } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const rename = util.promisify(fs.rename);

@Controller('/image')
export class ImageController {
  @Post('/upload')
  async uploadImage(@Files() files: any) {
    if (!files || files.length === 0) {
      return { success: false, message: '未上传文件' };
    }

    const savedUrls = [];

    for (const file of files) {
      const filename = file.filename;
      const tempPath = file.data;
      const destDir = path.join(__dirname, '../../public/uploads');

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const savePath = path.join(destDir, filename);
      await rename(tempPath, savePath);

      savedUrls.push(`/public/uploads/${filename}`);
      return {
        success: true,
        url:
          'https://3063-13-212-57-113.ngrok-free.app' +
          `/public/uploads/${filename}`,
      };
    }
  }
}
