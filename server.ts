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
import { randomInt } from 'crypto'

const server = new WebSocket.Server({ port: 3000 })
server.on('connection', (socket) => {
    interface auth { token: null | string, id: string, pw: string }
    interface msg {
        type: string,
        content: object,
    }
    interface clientMsg extends msg {
        auth: auth
    }

    const user: auth = {
        token: null,
        id: '',
        pw: ''
    }
    let clientMsg: clientMsg
    let type: string, content: object, auth: auth

    function sendMsg(msg: msg) {
        socket.send(JSON.stringify( msg ))
    }

    function send(type: string, content: object) {
        sendMsg({
            type,
            content
        })
    }

    function login(): msg {
        function generateToken() {
            return String(randomInt(1000000000000))
        }

        //가온누리 api로 check
        if (true) {
            user.token = generateToken()
            user.id = auth.id
            user.pw = auth.pw
            return {
                type: 'token',
                content: {
                    token: user.token
                }
            }
        }
        else {
            return {
                type: 'error',
                content: {
                    message: '아이디나 비밀번호가 틀립니다.'
                }
            }
        }
    }

    function isAuthorized() {
        if (user.token == null) return false
        return (
            user.token == auth.token
            && user.id == auth.id
            && user.pw == auth.pw
        )
    }

    socket.on('message', (data: string) => {
        clientMsg = JSON.parse(data.toString())
        ({ type, content, auth } = clientMsg)
        if (type == 'login') {
            sendMsg(login())
            return
        }
        else if(! isAuthorized()) {
            send(
                'error',
                {
                    message: 'invalid user'
                }
            )
        }
    })
})