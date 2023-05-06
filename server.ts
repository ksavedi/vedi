//서버 열기
import { resolve } from 'path'
import express from 'express'

const app = express()
app.use(express.static(resolve(__dirname, 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client/build/index.html'));
})
app.listen(80, () => {
    console.log('The server started!')
})

//웹소켓 통신
import { reply } from './reply'
import type { Id, User } from './interface/msg'
import type { ServerMsg } from './interface/serverMsg'
import type { ClientMsg } from './interface/clientMsg'

//가온누리 api로 check
const session: {
    [sessionKey in string]: Id;
} = {}

const checkValid = (user: User) => {
    console.log(JSON.stringify(user))
    return true
}

const generateSessionKey = () => {
    return '임시세션키'
}

const isAuthorized = (sessionKey: string) => {
    return sessionKey in session;
}

const login = (auth: User): ServerMsg => {
    if (checkValid(auth)) {
        const sessionKey = generateSessionKey()
        session[sessionKey] = auth.id
        return {
            query: 'loginResult',
            content: {
                result: true,
                sessionKey
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

app.post('/api', (req, res) => {
    const send = (serverMsg: ServerMsg) => {
        res.json(serverMsg)
        return true
    }

    const clientMsg = req.body as ClientMsg
    const { query, content, sessionKey } = clientMsg
    if (query === 'login') {
        return send(login({
            id: content.id,
            pw: content.pw
        }))
    }
    if (!isAuthorized(sessionKey)) {
        return send({
            query: 'error',
            content: {
                message: '아이디나 비밀번호가 틀립니다.'
            }
        })
    }

    send(reply(session[sessionKey], clientMsg))
})