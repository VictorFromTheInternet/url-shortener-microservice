import express from 'express'
const router = express.Router()
import { shortUrlController } from '../controllers/shorturl_controller.js'


router.post('/shorturl', shortUrlController)

export default router