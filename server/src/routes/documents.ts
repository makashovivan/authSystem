import { Router, Request, Response } from 'express'

export const router : Router = Router()


router.get('/', (req : Request, res : Response) => {
  console.log('get doc')
})

router.post('/', (req : Request, res : Response) => {
  console.log('post doc')
})