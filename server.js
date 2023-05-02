import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import express from 'express'

const app = express()
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/client'))
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/client/main/index.html');
})
app.listen(80, () => {
    console.log('server started!')
})