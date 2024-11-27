import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';
 
const Add = ({ token }) => {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])
    
    // useEffect(() => {
    //     console.log([name, description, price, category, subCategory, bestseller, sizes])
    // }, [name, description, price, category, subCategory, bestseller, sizes])

    const onSubmitHandler = async (e) => {
        e.preventDefault()  // ngăn gửi giữ liệu form và tải lại trang
        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product", formData, {
                headers: { token }
            })
            // console.log(response.data)
            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setPrice('')
                setCategory('Men')
                setSubCategory('Topwear')
                setBestseller(false)
                setSizes([])
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>

                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className='w-20 h-20 object-cover'/>
                        <input type="file" id='image1' hidden onChange={(e) => setImage1(e.target.files[0])}/>
                    </label>
                    <label htmlFor="image2">
                        <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='w-20 h-20 object-cover'/>
                        <input type="file" id='image2' hidden onChange={(e) => setImage2(e.target.files[0])}/>
                    </label>
                    <label htmlFor="image3">
                        <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className='w-20 h-20 object-cover'/>
                        <input type="file" id='image3' hidden onChange={(e) => setImage3(e.target.files[0])}/>
                    </label>
                    <label htmlFor="image4">
                        <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className='w-20 h-20 object-cover'/>
                        <input type="file" id='image4' hidden onChange={(e) => setImage4(e.target.files[0])}/>
                    </label>
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input type="text" placeholder='Type here' required
                    className='w-full max-w-[500px] px-3 py-2' onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea type="text" placeholder='Write content here' required
                    className='w-full max-w-[500px] px-3 py-2' onChange={(e) => setDescription(e.target.value)} value={description}/>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select className='w-full px-3 py-2' onChange={(e) => setCategory(e.target.value)}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select className='w-full px-3 py-2' onChange={(e) => setSubCategory(e.target.value)}>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product price</p>
                    <input type="number" placeholder='25' onChange={(e) => setPrice(e.target.value)} value={price}
                        className='w-full px-3 py-2 sm:w-[120px]'
                    />
                </div>
            </div>

            <div>
                <p className='mb-2'>Product sizes</p>
                <div className='flex gap-3'>
                    <div className={`px-3 py-1 cursor-pointer border ${sizes.includes("S") ? ' bg-pink-100 border-pink-300' : 'bg-slate-200 border-gray-300'}`}
                        onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p>S</p>
                    </div>
                    <div className={`px-3 py-1 cursor-pointer border ${sizes.includes("M") ? ' bg-pink-100 border-pink-300' : 'bg-slate-200 border-gray-300'}`}
                        onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p>M</p>
                    </div>
                    <div className={`px-3 py-1 cursor-pointer border ${sizes.includes("L") ? ' bg-pink-100 border-pink-300' : 'bg-slate-200 border-gray-300'}`}
                        onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p>L</p>
                    </div>
                    <div className={`px-3 py-1 cursor-pointer border ${sizes.includes("XL") ? ' bg-pink-100 border-pink-300' : 'bg-slate-200 border-gray-300'}`}
                        onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p>XL</p>
                    </div>
                    <div className={`px-3 py-1 cursor-pointer border ${sizes.includes("XXL") ? ' bg-pink-100 border-pink-300' : 'bg-slate-200 border-gray-300'}`}
                        onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input type="checkbox" id='bestseller' onChange={() => setBestseller(prev => !prev)} checked={bestseller}/>
                <label htmlFor="bestseller"
                    className='cursor-pointer'> Add to bestseller</label>
            </div>

            <button type='submit' className=' w-28 py-3 mt-4 bg-black text-white'>
                ADD
            </button>
        </form>
    );
};

export default Add;