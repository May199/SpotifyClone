import multer from 'multer';
import path from 'path';
import fs from 'fs';

export default multer({
  dest: path.resolve(__dirname, '..', '..', 'public', 'mp3'),
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const { userId, playlistId } = req.body;
      const folder = __dirname + `/../../public/mp3/${userId}/${playlistId}`;

      fs.mkdirSync(folder, { recursive: true });

      cb(null, folder);
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\. ]/g, '')
        .trim()
        .split(' ')
        .join('_');

      cb(null, `${Date.now()}_${fileName}`);
    },
  }),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(mp3)$/)) {
      cb(new Error('Inválid file type!'));
    } else {
      cb(null, true);
    }
  },
});
