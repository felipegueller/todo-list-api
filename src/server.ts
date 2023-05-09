import express from 'express'
import 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const serverPort = process.env.API_PORT

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(serverPort, () => console.log(`The server is running on port ${serverPort}.`))