import React from 'react';

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }


    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>
                Đăng ký ngay và nhận phiếu giảm giá 20%</p>
            <p className='text-gray-400 mt-3'>
            Ưu đãi chỉ dành cho khách hàng đăng ký qua email – hãy là người đầu tiên sở hữu các sản phẩm hot nhất!
            </p>
            <form onSubmit={onSubmitHandler} className=' w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Nhập email của bạn'
                    className='w-full sm:flex-1 outline-none'/>
                <button type='submit'
                    className='bg-black text-white text-xs px-10 py-4 uppercase'>
                    Đăng ký
                </button>
            </form>
        </div>
    );
};

export default NewsLetterBox;