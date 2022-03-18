import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import authRoute from './routes/auth.routes'
import helmet from "helmet";


const app = express()


app.set('pkg', pkg)
app.set("json spaces", 4);

app.use(express.json());
app.use(morgan('dev'))
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/api/auth', authRoute)

export default app
