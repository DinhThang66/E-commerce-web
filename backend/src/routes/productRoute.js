import express from 'express'
import { addProduct, adminGetAllProducts, getAllProducts, getProduct, removeProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()

productRouter.post('/', adminAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), addProduct)
productRouter.delete('/:id', adminAuth, removeProduct)

productRouter.get('/', getAllProducts)
productRouter.get('/admin', adminAuth, adminGetAllProducts)
productRouter.get('/:id', getProduct)

export default productRouter


