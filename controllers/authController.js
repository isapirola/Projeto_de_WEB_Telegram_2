import express from "express";
import { User } from '../models/user.js'
import jwt from "jsonwebtoken";

export const router = new express.Router()

function generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = await User.create(req.body);

        return res.send({ user, token: generateToken({ id: user.id }) })

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

    if(password != user.password){
        return res.status(400).send({ error: 'Invalid password' })        
    } 
    user.password = undefined

    res.send({ user, token: generateToken({ id: user.id }) })
})

router.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
  })