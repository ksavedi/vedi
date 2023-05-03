//서버 열기
import { resolve } from 'path'

import express from 'express'

const app = express()
app.use(express.static(resolve(__dirname, 'client/build')))
app.get('/', (request, response) => {
    response.sendFile(resolve(__dirname, 'client/build/index.html'));
})  
app.listen(80, () => {
    console.log('The server started!')
})

//class
import { Project } from './class/project'

//웹소켓 통신
import { WebSocket } from 'ws'

const server = new WebSocket.Server({ port: 3000 })
server.on('connection', (socket) => {
    socket.on('message', (data) => {
        const msg = JSON.parse(data.toString('utf-8'))
    })
})