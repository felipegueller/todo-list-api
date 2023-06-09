import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'

import { listRouter } from './routes/task-list.routes'
import { taskRouter } from './routes/task.routes'

const app = express()
const serverPort = process.env.API_PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/task-list', listRouter)
app.use('/tasks', taskRouter)

app.listen(serverPort, () => console.log(`The server is running on port ${serverPort}.`))