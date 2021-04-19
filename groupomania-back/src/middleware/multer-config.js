const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // 1st arg : null = no error 
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype];
    console.log('name : ', name)
    console.log('ext : ', extension)
    callback(null, name + Date.now() + '.' + extension)
  }
})

module.exports = multer({ storage }).single('images');