import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterProduct, setFilterProduct] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, setSortType] = useState('relavent')

    const toggleCategory = (e) => {
        // Lưu trạng thái checkbox của category
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item!== e.target.value))
        }else{
            setCategory(prev => [...prev, e.target.value])
        }
    }
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item!== e.target.value))
        }else{
            setSubCategory(prev => [...prev, e.target.value])
        }
    }
    const applyFilter = () => {
        let productCopy = products.slice()  // slice() để tạo ra một bản copy không thay đổi mảng gốc

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if(category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)
    }
    const sortProduct = () => {
        let fpCopy = filterProduct.slice()

        switch (sortType){
            case 'low-high':
                setFilterProduct(fpCopy.sort((a, b)=>(a.price -b.price)))
                break

            case 'high-low':
                setFilterProduct(fpCopy.sort((a, b)=>(b.price -a.price)))
                break

            default:
                applyFilter()
                break
        }

    }

    useEffect(() => {
        setFilterProduct(products)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        applyFilter()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subCategory, search, showSearch, products])
    useEffect(() => {
        sortProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType])
    
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter Options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'> PHÂN LOẠI
                    <img src={assets.dropdown_icon} alt="" 
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`}/>
                </p>
                {/* Category Filter */}

                <div className={`border border-gray-300 pl-5 py-3 mt-6 
                    ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='uppercase mb-3 text-sm font-medium'>Loại sản phẩm</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/> Thời trang nam
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/> Thời trang nữ
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/> Trẻ em
                        </p>
                    </div>
                </div>
                
                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5
                    ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='uppercase mb-3 text-sm font-medium'>Kiểu</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Áo
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Quần
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Áo khoác
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>

                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'THỜI'} text2={'TRANG'}/>
                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relavent">Sắp xếp theo: Độ liên quan</option>
                        <option value="low-high">Sắp xếp theo: Giá thấp tới cao</option>
                        <option value="high-low">Sắp xếp theo: Giá cáo tới thấp</option>
                    </select>
                </div>

                {/* Map product */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {filterProduct.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;