import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: async (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      `.${file.originalname.split('.').pop()}`;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only file format of jpg, jpeg, png and gif are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};
