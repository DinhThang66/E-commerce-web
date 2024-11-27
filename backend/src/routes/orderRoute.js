import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderZalopay, allOrders, userOrders, updateStatus, callbackZalopay} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.get('/', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/zalopay', authUser, placeOrderZalopay)
orderRouter.post('/callback-zalopay', callbackZalopay)

// User Features
orderRouter.post('/user-orders', authUser, userOrders)

export default orderRouter