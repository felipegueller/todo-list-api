import express from 'express'
import 'dotenv'

const app = express()
const serverPort = process.env.API_PORT

app.listen(serverPort, () => console.log(`The server is running on port ${serverPort}.`))