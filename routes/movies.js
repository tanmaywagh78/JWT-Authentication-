const express = require('express');
const multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
  }
})
 
var upload = multer({ storage: storage })

const router = express.Router();
const movieController = require('../app/api/controllers/movies');
router.get('/', movieController.getAll);
router.post('/',upload.array('movieImage',10), movieController.create);
router.get('/:movieId', movieController.getById);
router.put('/:movieId', movieController.updateById);
router.delete('/:movieId', movieController.deleteById);
module.exports = router;

// single('movieImage')