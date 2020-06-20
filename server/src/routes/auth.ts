import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'
import User from '../models/User'
import secretConfig from '../secretConfig'



export const router : Router = Router()


router.post(
  '/register',
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'incorrect password').isLength({ min: 7 })
  ],
  async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'incorrect register data'
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'this user already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'user created' })

  } catch (e) {
    res.status(500).json({ message: 'something went wrong, try again' })
  }
})


router.post(
  '/login',
  [
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password', 'incorrect password').exists()
  ],
  async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    console.log("LOGIN REQUEST: ", req.body)


    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'incorrect login data'
      })
    }

    const {email, password} = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'this user doesn\'t exists' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'incorrect password' })
    }

    const token = jwt.sign(
      { userId: user.id },
      secretConfig.jwtKey,
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'something went wrong, try again' })
  }
})












router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })



    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      secretConfig.jwtKey,
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})