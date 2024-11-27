import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
    return (
        <>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'THÔNG'} text2={'TIN'}/>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img src={assets.about_img} alt="" className='w-full md:max-w-[420px]'/>
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>
                        <b>Forever </b> 
                        ra đời từ niềm đam mê sáng tạo và khát vọng cách mạng hóa cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng có thể dễ dàng khám phá, tìm hiểu và mua sắm đa dạng các sản phẩm ngay tại nhà của mình.</p>
                    <p>Kể từ khi thành lập, chúng tôi đã không ngừng nỗ lực để chọn lọc một danh mục sản phẩm đa dạng và chất lượng cao, đáp ứng mọi sở thích và nhu cầu. Từ thời trang và làm đẹp đến điện tử và đồ dùng gia đình, chúng tôi cung cấp một bộ sưu tập phong phú được lấy từ các thương hiệu và nhà cung cấp đáng tin cậy.</p>
                    <b className='text-gray-800'>Sứ mệnh của chúng tôi</b>
                    <p>Sứ mệnh của chúng tôi tại Forever là mang đến cho khách hàng sự lựa chọn, sự thuận tiện và sự tự tin. Chúng tôi tận tâm cung cấp trải nghiệm mua sắm liền mạch vượt quá mong đợi, từ duyệt và đặt hàng đến giao hàng và hơn thế nữa.</p>
                </div>
            </div>
            <div className='text-4xl py-4'>
                <Title text1={'TẠI SAO'} text2={'CHỌN CHÚNG TÔI'}/>
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Đảm bảo chất lượng:</b>
                    <p className='text-gray-600'>Chúng tôi lựa chọn và kiểm tra tỉ mỉ từng sản phẩm để đảm bảo đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Sự tiện lợi</b>
                    <p className='text-gray-600'>Với giao diện thân thiện với người dùng và quy trình đặt hàng đơn giản, việc mua sắm chưa bao giờ dễ dàng hơn thế.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Dịch vụ khách hàng đặc biệt:</b>
                    <p className='text-gray-600'>Đội ngũ chuyên gia tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
                </div>
            </div>

            <NewsLetterBox/>

        </>
    );
};

export default About;