import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {

    const { delivery_fee, getCartAmount } = useContext(ShopContext)

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'TỔNG'} text2={'GIÁ'}/>
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Tạm tính</p>
                    <p>{getCartAmount().toLocaleString("de-DE")} đ</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Phí vận chuyển</p>
                    <p>{delivery_fee.toLocaleString("de-DE")} đ</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Tổng cộng</b>
                    <b>{getCartAmount() === 0 ? 0 : (getCartAmount() + delivery_fee).toLocaleString("de-DE")} đ</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;