import multer from 'multer';
import path from 'path';

export default multer({
  dest: path.resolve(__dirname, '..', '..', 'public', 'cover'),
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', '..', 'public', 'cover'));
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname
        .toLowerCase()
        .trim()
        .split(' ')
        .join('_');
        
      cb(null, `${Date.now()}_${fileName}`);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      cb(new Error('Inválid file type!'));
    } else {
      cb(null, true);
    }
  },
});
