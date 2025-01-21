import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if ( token_decode.role !== "admin") {
            return res.json({ success: false, message: "Not Authorized Login Again"})
        }
        
        // Gắn thông tin vào req để sử dụng ở middleware hoặc handler kế tiếp
        req.user = {
            id: token_decode.id, // Gắn id từ token
            role: token_decode.role,
        };

        next()
    } catch (error) {
        console.log(error)
        res.json({  success: false, message: error.message })  
    }
}

export default adminAuth