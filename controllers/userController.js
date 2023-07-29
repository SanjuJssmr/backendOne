import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const existUser = await User.findOne({email})

    if (existUser) {
        res.status(400)
        throw new Error('User already registered')
    }

    const hashPass = await bcrypt.hash(password, 10)

    const newUser = await User.create({ username: username, email: email, password: hashPass })
    if (newUser) {
        res.status(201).json({_id:newUser.id,email:newUser.email})
    }
    else {
        res.status(400)
        throw new Error('User data nor found')
    }
   

})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
     
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.SECRET_JWT,
            { expiresIn: "60m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

export const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})