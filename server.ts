//서버 열기
import { resolve } from 'path'

import express from 'express'

const app = express()
app.use(express.static(__dirname))
app.use(express.static(resolve(__dirname, '/client')))
app.get('/', (request, response) => {
    response.sendFile(resolve(__dirname, '/client/main/index.html'));
})
app.listen(80, () => {
    console.log('server started!')
})

//class
import { Project } from './class/project.js'

//웹소켓 통신
import { WebSocket } from 'ws'

const server = new WebSocket.Server({ port: 3000 })
server.on('connection', (socket) => {
    socket.on('message', (data) => {
        const msg = JSON.parse(data.toString('utf-8'))
    })
})