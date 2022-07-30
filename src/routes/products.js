// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************  MULTER ************

// {
//   fieldname: 'product-img',
//   originalname: 'motorola.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg'
// }

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
}) 


var upload = multer({ storage: storage })

// ************  MULTER ************

/*** GET ALL PRODUCTS ***/ 
 router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('product-img'), productsController.store); 


// /*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/edit/:id', productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
