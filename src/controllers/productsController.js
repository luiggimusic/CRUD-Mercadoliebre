const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
	res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const idProduc = req.params.id;
		const product = products.find( (elemento) => { return elemento.id == idProduc } );
		res.render('detail', {product: product})
	},

	// Create - Form to create
	create: (req, res) => {
	res.render('product-create-form');
	},

	// Create -  Method to store
	store: (req, res) => {

		// file {
		// 	fieldname: 'product-img',
		// 	originalname: 'motorola.jpg',
		// 	encoding: '7bit',
		// 	mimetype: 'image/jpeg',
		// 	destination: 'public/images/products',
		// 	filename: '1658794930922-motorola.jpg',
		// 	path: 'public\\images\\products\\1658794930922-motorola.jpg',
		// 	size: 23914
		// }
		
	const nuevoProducto = req.body;
	nuevoProducto.id = products.length +1;
	nuevoProducto.image = req.file.filename;
	products.push(nuevoProducto);
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
	res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const idProduc = req.params.id;
		const productEdit = products.find( item => item.id == idProduc )
		res.render('product-edit-form', {productEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		const idProduc = req.params.id;
		const productEdit = req.body;
		const product = products.find( item => item.id == idProduc )
		
		product.name = productEdit.name;
		product.price = productEdit.price;
		product.discount = productEdit.discount;
		// product.image = productEdit.image;

		if(req.file){
			product.image = req.file.filename;
		}
		
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const idProduc = req.params.id;
		const productsFilter = products.filter( item => item.id != idProduc )
		const data = JSON.stringify(productsFilter, null, ' ');
		fs.writeFileSync(productsFilePath, data);
		res.redirect('/')
	}
};

module.exports = controller;