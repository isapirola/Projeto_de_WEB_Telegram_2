import express from "express";
import { Amiibo } from '../models/amiibo.js'

export const router = new express.Router()

router.post('/post', async (req, res) => {
    const { imageURL } = req.body

    try {
        if(await Amiibo.findOne({ imageURL })){
            return res.status(400).send({ error: 'Amiibo already exists' });
        }

        const amiibo = await Amiibo.create(req.body);

        return res.send({ amiibo })

    } catch (err) {
        return res.status(400).send({ error: 'Post failed' })
    }
})

router.get('/search', async (req, res) => {
    const { name } = req.body

    try {
        const amiibos = await Amiibo.find({ name })

        if(Object.keys(amiibos).length === 0){
            return res.status(400).send({ error: 'Amiibo does not exist' });
        }

        res.send(amiibos);

    } catch (err) {
        return res.status(400).send({ error: 'Search failed' })
    }
})