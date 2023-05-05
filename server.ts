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
import type { Auth } from './interface/msg'
import type { ServerMsg } from './interface/serverMsg'
import type { ClientMsg } from './interface/clientMsg'

//가온누리 api로 check
const checkValid = (user: Auth) => {
    console.log(JSON.stringify(user))
    return true
}

const isAuthorized = (user: Auth, auth: Auth) => {
    console.log(user, auth)
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

    const user: Auth = {
        id: null,
        pw: null
    }

    const login = (auth: Auth): ServerMsg => {
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
        const { query, /* content, */ auth } = clientMsg
        if (query === 'login') {
            return send(login(auth))
        }
        if (!isAuthorized(user, auth)) {
            return send({
                query: 'error',
                content: {
                    message: 'Invalid user.'
                }
            })
        }

        send(reply(clientMsg))
    })
})