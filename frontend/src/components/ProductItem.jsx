import React from 'react';
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {


    return (
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
                <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out aspect-square object-cover'/>
            </div>
            <p className='pt-3 pb-1 text-sm line-clamp-3'>{name}</p>
            <p className='text-sm font-medium'>
                {price.toLocaleString('de-DE')}
                <sup className='underline'>đ</sup>
            </p>
        </Link>
    );
};

export default ProductItem;