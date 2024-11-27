import jwt from 'jsonwebtoken'

const createToken = (payload) => {
    const token = jwt.sign({
        ...payload
    }, process.env.JWT_SECRET )
    return token
}

export {createToken}