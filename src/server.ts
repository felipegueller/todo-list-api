import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'

import { listRouter } from './routes/list.routes'

const app = express()
const serverPort = process.env.API_PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/lists', listRouter)

app.listen(serverPort, () => console.log(`The server is running on port ${serverPort}.`))