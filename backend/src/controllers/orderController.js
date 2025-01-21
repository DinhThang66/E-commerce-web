import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import config from '../config/zalopay.js'

import axios from 'axios';
import CryptoJS from 'crypto-js'
import moment from 'moment';
import qs from 'qs'
import productModel from "../models/productModel.js";


// Placing orders using (Cash on Delivery) COD MEthod
const placeOrder = async(req, res) => {
    try {
        const { userId, items, amount, address} = req.body

        // const orderData = {
        //     userId,
        //     items, 
        //     amount,
        //     address,
        //     paymentMethod: "COD",
        //     payment: false,
        //     date: Date.now()
        // }
        // //console.log(orderData)
        // console.log("Item\n",items)
        // items.forEach(async (item) => {
        //     const id = item._id
        //     const quatity = item.quatity
        //     const quantity = item.quantity
        //     await productModel.findByIdAndUpdate(id, {quatity: quatity - quantity})

        // });

        // const newOrder = await orderModel.create(orderData)
        // await userModel.findByIdAndUpdate(userId, {cartData: {}})

        // Nhóm sản phẩm theo sellerId
        const ordersBySeller = items.reduce((acc, item) => {
            acc[item.sellerId] = acc[item.sellerId] || [];
            acc[item.sellerId].push(item);
            return acc;
        }, {});
        
        // Tạo đơn hàng cho từng nhóm và xử lý số lượng sản phẩm
        for (const [sellerId, sellerItems] of Object.entries(ordersBySeller)) {
            const amount = sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            // Tạo đơn hàng
            await orderModel.create({
                userId,
                items: sellerItems,
                amount,
                address,
                paymentMethod: "COD",
                payment: false,
                date: Date.now(),
            });

            // Cập nhật số lượng sản phẩm
            await Promise.all(
                sellerItems.map(item =>
                    productModel.findByIdAndUpdate(item._id, {
                        $inc: { quatity: -item.quantity },
                    })
                )
            );
        }

        // Xóa giỏ hàng
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
    
}


// Placing orders using Stripe MEthod
const placeOrderStripe = async(req, res) => {
    
}


// Placing orders using Zalopay MEthod
const placeOrderZalopay = async(req, res) => {
    const { userId, items, amount, address} = req.body

    const embed_data = {
        redirecturl: "http://localhost:5173/",
        userId, // Thêm userId vào embed_data
        address,
    };

    const _items = [{
        items
    }];

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(_items),
        embed_data: JSON.stringify(embed_data),
        amount: amount,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "",
        callback_url: "https://3281-2402-800-62d0-1081-8403-fbb4-6ddb-c6e0.ngrok-free.app/api/order/callback-zalopay", // thanh toán thành công thì gọi call back, dùng ngrok để public port
    };
    
    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


    try {
        const result = await axios.post(config.endpoint, null, { params: order })
        return res.status(200).json({success: true, data: result.data, order})
    } catch (error) {
        console.log(error)
    }
    
}

const callbackZalopay = async(req, res) => {
    let result = {};
    console.log('callback')

    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;
    
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log("mac =", mac);
    
    
        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
            const userId = JSON.parse(dataJson.embed_data)?.userId
            const orderData = {
                userId: userId,
                items: JSON.parse(dataJson.item)[0].items, 
                amount: dataJson.amount,
                address: JSON.parse(dataJson.embed_data)?.address,
                paymentMethod: "Zalopay",
                payment: true,
                date: Date.now()
            }
            console.log("orderData", JSON.stringify(orderData.items, null, 2))
            result.return_code = 1;
            result.return_message = "success";

            const newOrder = await orderModel.create(orderData)
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            console.log('The end')
    
        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    res.json(result);
}

// All Order data for Admin Panel
const allOrders = async(req, res) => {
    try {
        // Lấy thông tin người bán từ middleware
        const sellerId = req.user.id;

        // Tìm các đơn hàng chứa sản phẩm của admin hiện tại
        const orders = await orderModel.find({
            items: {
                $elemMatch: { sellerId }, // Kiểm tra trong mảng items có sản phẩm nào thuộc sellerId này
            },
        });
        

        // const orders = await orderModel.find({})
        res.json({ success: true, orders })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })   
    }
}


// All Order data for frontend
const userOrders = async(req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async(req, res) => {
    try {
        const { orderId, status } = req.body
        
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderStripe, placeOrderZalopay, callbackZalopay, allOrders, userOrders, updateStatus}