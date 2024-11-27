import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
    return (
        <>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'LIÊN'} text2={'LẠC'}/>
            </div>

            <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28'>
                <img src={assets.contact_img} alt="" className='w-full md:max-w-[420px]'/>
                <div className='flex flex-col items-start justify-center gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>CỬA HÀNG</p>
                    <p className='text-gray-500'>Ngõ 65 Pham Ngọc Thạch, <br/> Phường Kim Liên, Đống Đa, Hà Nội.</p>
                    <p className='text-gray-500'>
                        Điện thoại: (+84) 123 456 789
                        <br/> Email: admin@dinhthang.com
                    </p>
                    <p className='font-semibold text-xl text-gray-600'>Cơ hội nghề nghiệp tại Forever</p>
                    <p className='text-gray-500'>Tìm hiểu thêm về đội ngũ của chúng tôi và cơ hội việc làm.</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition duration-500'>Khám phá</button>
                </div>
            </div>

            <NewsLetterBox />
        </>
    );
};

export default Contact;