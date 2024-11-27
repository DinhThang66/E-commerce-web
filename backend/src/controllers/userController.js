import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createToken } from '../services/JwtService.js'


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({
                success: false,
                message: "User doesn't exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken({id: user._id})
            return res.json({ success: true, token })    
        } else {
            return res.json({ success: false, message: "Invalid credentials" })    
        }       
    } catch (error) {
        console.log(error)
        res.json({  success: false, message: error.message })   
    }
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        // Checking user already exists or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)   // Tạo một chuỗi ngẫu nhiên với độ dài 10 rounds
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            name, email,
            password: hashPassword
        })

        const token = createToken(newUser._id)
        return res.json({ success: true, token })    
    } catch (error) {
        console.log(error)
        res.json({  success: false, message: error.message })  
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.json({ success: true, token })    
        } else {
            return res.json({ success: false, message: "Invalid credentials" })    
        }  
    } catch (error) {
        console.log(error)
        res.json({  success: false, message: error.message })  
    }
}

export {loginUser, registerUser, adminLogin};