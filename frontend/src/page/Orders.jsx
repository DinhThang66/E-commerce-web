import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const formatVietnameseDate = (timestamp) => {
    const date = new Date(timestamp); // Chuyển timestamp sang Date object
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long', // Thứ (Thứ Hai, Thứ Ba, ...)
      day: '2-digit',  // Ngày (01, 02, ...)
      month: 'long',   // Tháng (Tháng 11, Tháng 12, ...)
      year: 'numeric'  // Năm (2024, ...)
    }).format(date);
  };

const Orders = () => {
    const { backendUrl, token } = useContext(ShopContext)
    const [ orderData, setOrderData ] = useState([])

    const loadOrderData = async () => {
        try {
            if (!token){
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/user-orders', {}, {
                headers: { token }
            })
            // console.log(response.data)
            if (response.data.success) {
                let allOrdersItem = []

                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadOrderData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'ĐƠN HÀNG'} text2={'CỦA TÔI'}/>
            </div>

            <div>
                {orderData.map((item, index) => (
                    <div key={index} className='py-4 border-y text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex items-start gap-6 text-sm'>
                            <img src={item.image[0]} alt="" className='w-16 sm:w-20'/>
                            <div>
                                <p className='sm:text-base font-medium max-w-96 line-clamp-2'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                    <p className='text-lg'>{item.price.toLocaleString('de-DE')}
                                        <sup className='underline'>đ</sup>
                                    </p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className='mt-2'>Ngày: <span className=' text-gray-400'>{formatVietnameseDate(item.date)}</span></p>
                                <p className='mt-2'>Phương thức thanh toán: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                            </div>
                        </div>

                        <div className='md:w-1/2 flex justify-between'>
                            <div className=' flex items-center gap-2'>
                                <p className=' min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className=' text-sm md:text-base'>{item.status}</p>
                            </div>
                            <button onClick={loadOrderData} className=' border px-4 py-2 text-sm'>Track Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;