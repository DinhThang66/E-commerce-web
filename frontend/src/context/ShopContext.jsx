import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error('Select Product size')
            return
        }
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
        console.log("cartData", cartData)
        // Api
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart', { itemId, size }, {
                    headers: { token}
                })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity
        setCartItems(cartData)
        // Api
        if ( token ) {
            try {
                await axios.put(backendUrl + '/api/cart', { itemId, size, quantity }, {
                    headers: { token}
                })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async ( token ) => {
        try {
            const response = await axios.get(backendUrl + '/api/cart', {
                headers: { token }
            })

            if(response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount
    } 

    const getCartAmount = () => {
        let totalAmount = 0 
        for (const items in cartItems) {
           let itemInfo = products.find((product) => product._id === items)
           for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
            // console.log(response.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getProductsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!token && localStorage && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, token, setToken, 
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider