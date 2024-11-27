import cloudinary from 'cloudinary'
import productModel from '../models/productModel.js'

// func for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        const productData = {
            name, description, 
            price: Number(price), 
            category, subCategory, 
            sizes: JSON.parse(sizes), 
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        const newProduct = await productModel.create(productData)
        res.json({ success: true, message: "Product Added", product: newProduct })   
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })   
    }
}

const removeProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productModel.findById(id)
        if (!product){
            return res.json({ success: false, message: "Product doesn't exists" })  
        }
        
        await productModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Product removed" })   
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productModel.findById(id)
        res.json({ success: true, product })   
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })   
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products: products })   
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

export { addProduct, removeProduct, getProduct, getAllProducts};


