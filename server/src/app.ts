import express, { Application } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { router as authRoute } from './routes/auth'
import { router as documentsRoute } from './routes/documents'
import secretConfig from './secretConfig'

const app : Application = express()

app.use('/api/auth', authRoute)
app.use('/api/documents', documentsRoute)


// app.use('/', express.static(path.join(__dirname, '../../client/build')))

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
// })

async function startApp() {
  try {
    await mongoose.connect(secretConfig.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(8000, () => {
      console.log('start listening...')
    })
  } catch(e) {
    console.log('Cant start server because of error: ' + e.message)
    process.exit(1)
  }
}

startApp()