import { Router, Request, Response } from 'express'
import { auth } from '../middleware/auth.middleware'
import Document from '../models/Document'
export const router : Router = Router()


router.get('/', auth, async (req : any, res : Response) => {
  try {
    const documents = await Document.find({ owner: req.user.userId })
    res.json(documents)
  } catch (e) {
    res.status(500).json({ message: 'something went wrong, try again' })
  }
})

router.post('/', auth, async (req : any, res : Response) => {
  try {
    const { title, text } = req.body
    const document = new Document({ title, text, owner: req.user.userId })
    await document.save()
    res.status(201).json({ document })
  } catch (e) {
    res.status(500).json({ message: 'something went wrong, try again' })
  }
})