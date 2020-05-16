import express, { Application } from 'express'
import path from 'path'
import { router as authRoute } from './routes/auth'
import { router as documentsRoute } from './routes/documents'


const app : Application = express()


app.use('/api/auth', authRoute)
app.use('/api/documents', documentsRoute)


app.listen(8000, () => {
  console.log('start listening...')
})

// app.use('/', express.static(path.join(__dirname, '../../client/build')))

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
// })