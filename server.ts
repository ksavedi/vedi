//서버 열기
import { resolve } from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.static(resolve(__dirname, 'client/build')))
app.use(express.json())
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser())
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client/build/index.html'));
})
app.listen(80, () => {
    console.log('The server started!')
})

//통신
import { reply } from './reply'
import type { Id, User } from './interface/res'
import type { ServerRes } from './interface/serverRes'
import type { ClientRes } from './interface/clientRes'

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
    return sessionKey in session
}

app.post('/api', (req, res) => {
    const send = (serverRes: ServerRes) => {
        res.json(serverRes)
    }
    
    const login = (auth: User): ServerRes => {
        if (checkValid(auth)) {
            const sessionKey = generateSessionKey()
            session[sessionKey] = auth.id
            res.cookie('sessionKey', sessionKey, {
                maxAge: 60 * 60 * 1000
            })
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


    const clientRes = req.body as ClientRes
    const { query, content, sessionKey } = clientRes
    if (query === 'login') {
        send(login(content))
        return
    }

    if (!isAuthorized(sessionKey)) {
        send({
            query: 'error',
            content: {
                message: '아이디나 비밀번호가 틀립니다.'
            }
        })
        return
    }

    send(reply(session[sessionKey], clientRes))
})