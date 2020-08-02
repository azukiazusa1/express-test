import Express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes'
import errorMiddleware from './middleware/error'

const app = Express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/express-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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

app.listen(port, () => {
  console.log('server start')
})

export default app
