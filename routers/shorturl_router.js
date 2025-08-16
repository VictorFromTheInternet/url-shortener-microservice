import express from 'express'
const router = express.Router()
import { shortUrlController, getUrlController} from '../controllers/shorturl_controller.js'


router.post('/shorturl', shortUrlController)
router.get('/shorturl/:shorturl', getUrlController)

export default router