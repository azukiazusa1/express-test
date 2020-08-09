import Express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes'
import errorMiddleware from './middleware/error'

const app = Express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost:27017/express-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect((global as any).__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}

mongoose.Promise = global.Promise

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use('/api', router)
app.use('/', errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log('server start')
  })
}

export default app
