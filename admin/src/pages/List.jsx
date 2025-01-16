import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product')
            console.log(response.data)
            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(backendUrl + '/api/product/' + id, {
                headers: {token}
            })

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList()
            } else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>
            <p className='mb-2 capitalize'>All Products List</p>
            
            <div className='flex flex-col gap-2'>
                {/* List table title */}
                <div className='grid grid-cols-[1fr_2fr_1fr_1_fr_0.5fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b className='hidden md:block'>Category</b>
                    <b>Price</b>
                    <b>Quatity</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* Product List */}
                {list.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
                        <img src={item.image[0]} alt="" className=' w-14 h-14 object-cover md:w-24 md:h-24'/>
                        <p>{item.name}</p>
                        <p className='hidden md:block'>{item.category}</p>
                        <p>{item.price.toLocaleString('vi-VN')} <sup className=' underline'>đ</sup></p>
                        <p className='hidden md:block'>{item.quatity}</p>
                        <p className='text-right md:text-center cursor-pointer md:text-lg text-sm' onClick={() => removeProduct(item._id)}>X</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;