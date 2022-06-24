import express from "express";
import { User } from '../models/user.js'

export const router = new express.Router()

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = await User.create(req.body);

        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return res.status(400).send({ error: 'User not found' })
    }

    if(password === user.password){
        res.send({ user })
    } else{
        return res.status(400).send({ error: 'Invalid password' })
    }
})