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
// import { Project } from './class/project'

//웹소켓 통신
import { WebSocket } from 'ws'
import { randomInt } from 'crypto'
import type { Auth, ClientMsg, Msg } from './interface'

const generateToken = () => randomInt(1000000000000).toString()

//가온누리 api로 check
const checkValid = () => true

const login = (user: Auth, auth: Auth): Msg => {
    if (checkValid()) {
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

const isAuthorized = (user: Auth, auth: Auth) => {
    if (user.token === null) return false
    return (
        user.token === auth.token
        && user.id === auth.id
        && user.pw === auth.pw
    )
}

const server = new WebSocket.Server({ port: 3000 })
server.on('connection', (socket) => {
    const send = (content: Msg | string) => {
        if (typeof content === 'string') socket.send(content)
        else socket.send(JSON.stringify(content))
    }

    const user: Auth = {}

    socket.on('message', (data: string) => {
        const clientMsg = JSON.parse(data.toString()) as ClientMsg
        const { type, content, auth } = clientMsg
        if (type === 'login') {
            const res = login(user, auth)
            send(res)
            return
        }
        if (!isAuthorized(user, auth)) {
            send({
                type: 'error',
                content: {
                    message: 'invalid user'
                }
            })
            return
        }
    })
})