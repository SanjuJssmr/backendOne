import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized")
            }
            req.user = decoded.user
            next()
        })
        if (!token) {
            res.status(401);
            throw new Error("User not authorized or token is missing")
        }
    }
})