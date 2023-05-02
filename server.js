//@ts-check
//현재 경로 가져옴
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//서버 열기
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

//class
import { Project } from './class/project.js'

//웹소켓 통신
import { WebSocketServer } from 'ws'

const server = new WebSocketServer({port: 3000})
server.on('connection', (socket, request) => {
    socket.on('message', (msg) => {
        msg = JSON.parse(msg.toString('utf-8'))
    })
})