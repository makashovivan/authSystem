import { Router, Request, Response } from 'express'

export const router : Router = Router()


router.post('/register', (req : Request, res : Response) => {
  console.log('register')
})

router.post('/login', (req : Request, res : Response) => {
  console.log('login')
})