import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/', authUser, addToCart)
cartRouter.put('/', authUser,  updateCart)
cartRouter.get('/', authUser, getUserCart)

export default cartRouter