import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

    const {productId} = useParams()
    const {products, addToCart} = useContext(ShopContext)
    const [productData, setProductData] = useState(false)
    const [image, setImage] =useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId){
                setProductData(item)
                setImage(item.image[0])
                // console.log(item);
                
                return null
            }
        })
    }
    useEffect(() => {
        fetchProductData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, products])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product data */}
            <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto 
                        justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productData.image.map((item, index) => (
                            <img  src={item} key={index} alt="" onClick={()=>setImage(item)}
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} alt="" className='w-full h-auto'/>

                    </div>

                </div>

                {/* Product info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className='w-3'/>
                        <img src={assets.star_icon} alt="" className='w-3'/>
                        <img src={assets.star_icon} alt="" className='w-3'/>
                        <img src={assets.star_icon} alt="" className='w-3'/>
                        <img src={assets.star_dull_icon} alt="" className='w-3'/>
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{productData.price.toLocaleString("de-DE")} 
                        <sup className='underline'>đ</sup>
                    </p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p >Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100
                                    ${item === size ? 'border-orange-500' : ''}`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className='uppercase bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                        onClick={() => addToCart(productData._id, size)}>
                        Thêm vào giỏ hàng
                    </button>
                    <hr className='mt-8 sm:w-4/5'/>

                    <div className=' text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Review Section */}
            <div className='mt-20'>
                <div className='flex '>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Review (120)</p>
                </div>

                <div className='flex flex-col gap-4 border p-6 text-sm text-gray-500'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta nesciunt mollitia quae quis id ducimus, sit, ea exercitationem dolore iusto eligendi beatae assumenda in ipsum, odit eius quos recusandae animi!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolorem autem quos nulla quis reiciendis dolor at magni, doloribus, magnam repellendus ipsa expedita omnis facere consequuntur. Quos fugit unde hic.</p>
                </div>
            </div>

            {/* Display related products */}

            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
    ) : null
};

export default Product;