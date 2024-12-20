import express from 'express'
const app = express()
import axios from 'axios';
import CryptoJS from 'crypto-js'
import moment from 'moment';
import qs from 'qs'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/payment", async(req, res) => {
    const embed_data = {
        redirecturl: "http://pcrender.com"
    };

    const items = [{

    }];

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "",
        callback_url: "https://0fc4-2402-800-62d0-1081-d4ff-a5f5-9464-59e.ngrok-free.app/callback", // thanh toán thành công thì gọi call back, dùng ngrok để public port
    };
    
    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


    try {
        const result = await axios.post(config.endpoint, null, { params: order })
        return res.status(200).json({data: result.data, order})
    } catch (error) {
        console.log(error)
    }
})

app.post("/callback", async(req, res) => {
    let result = {};

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
    
            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    res.json(result);
})

app.post('/order-status/:app_trans_id', async(req, res) => {
    const app_trans_id = req.params.app_trans_id

    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id , // Input your app_trans_id
    }

    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


    let postConfig = {
        method: 'post',
        url: "https://sb-openapi.zalopay.vn/v2/query",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };

    try {
        const result = await axios(postConfig)
        return res.status(200).json(result.data)
    } catch (error) {
        console.log(error.message)
    }
})

const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

app.listen(5000, ()=> {
    console.log("Server run at port 5000")
})