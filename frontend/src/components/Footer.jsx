import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} alt="" className='mb-5 w-32'/>
                    <p className=' w-full md:w-2/3 text-gray-600 italic'>
                        Phong cách vĩnh cửu, thời trang hiện đại.
                    </p>
                    <p className=' w-full md:w-2/3 text-gray-600 pt-2'>
                        Chúng tôi mang đến những thiết kế tinh tế và chất lượng cao, giúp bạn tự tin thể hiện cá tính mọi lúc, mọi nơi.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>CÔNG TY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Trang chủ</li>
                        <li>Thông tin</li>
                        <li>Chính sách giao hàng</li>
                        <li>Chính sách bảo mật</li>
                    </ul>
                </div>
                <div>
                    <p className=' text-xl font-medium mb-5'>LIÊN HỆ VỚI CHÚNG TÔI</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>
                            <span className='font-bold'>Điện thoại:</span>
                            (+84) 123 456 789
                        </li>
                        <li>
                            <span className='font-bold'>Email:</span>
                            contact@dinhthang.com
                        </li>
                    </ul>
                </div>
            </div>

            
            <div>
                <hr/>
                <p className='py-5 text-sm text-center'>Copyright 2024@ dinhthang.com - All Right Reserved</p>
                    
            </div>
        </>
    );
};

export default Footer;