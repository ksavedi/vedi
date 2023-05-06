//서버 열기
import { resolve } from 'path'
import express from 'express'

const app = express()
app.use(express.static(resolve(__dirname, 'client/build')))
app.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client/build/index.html'));
})
app.listen(80, () => {
    console.log('The server started!')
})

//웹소켓 통신
import { WebSocket } from 'ws'
import { reply } from './reply'
import type { User } from './interface/msg'
import type { ServerMsg } from './interface/serverMsg'
import type { ClientMsg } from './interface/clientMsg'

//가온누리 api로 check
const checkValid = (user: User) => {
    console.log(JSON.stringify(user))
    return true
}

const isAuthorized = (user: User, sessionKey: string) => {
    console.log(user, sessionKey)
    return true
    // if (user.id === null) return false
    // return user.id === auth.id && user.pw === auth.pw
}

const server = new WebSocket.Server({ port: 3000 })
server.on('connection', (socket) => {
    const send = (serverMsg: ServerMsg) => {
        socket.send(JSON.stringify(serverMsg))
        return true
    }

    const user: User = {
        id: null,
        pw: null
    }

    const login = (auth: User): ServerMsg => {
        if (checkValid(auth)) {
            user.id = auth.id
            user.pw = auth.pw
            return {
                query: 'loginResult',
                content: {
                    result: true
                }
            }
        }
        else {
            return {
                query: 'error',
                content: {
                    message: '아이디나 비밀번호가 틀립니다.'
                }
            }
        }
    }

    socket.on('message', (data: string) => {
        const clientMsg = JSON.parse(data.toString()) as ClientMsg
        const { query, content, sessionKey } = clientMsg
        if (query === 'login') {
            return send(login({
                id: content.id,
                pw: content.pw
            }))
        }
        if (!isAuthorized(user, sessionKey)) {
            return send({
                query: 'error',
                content: {
                    message: '아이디나 비밀번호가 틀립니다.'
                }
            })
        }

        send(reply(user, clientMsg))
    })
})