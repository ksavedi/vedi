// 서버 열기
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

// dotenv
import { load } from 'ts-dotenv'
const env = load({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    COOKIE_SECRET: String,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LOGIN_AKEY: String,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PNAME_AKEY: String
})

// 통신
import { reply } from './reply'
import type { Id, User } from './interface/basic'
import type { ServerRes } from './interface/serverRes'
import type { ClientRes } from './interface/clientRes'
import { randomInt } from 'crypto'
import fetch from 'node-fetch'

//가온누리 api로 check
const session: {
    [sessionKey in string]: Id;
} = {}

const checkValid = async (auth: User): Promise<boolean> => {
    return true
    // invalid api key error
    // eslint-disable-next-line no-unreachable
    const response = await fetch(
        'https://gaonnuri.ksain.net/api/v2/PAuth.php',
        {
            method: 'post',
            
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: auth.id,
                pw: auth.pw,
                akey: env.LOGIN_AKEY
            })
        }
    )
    const result = await response.json() //invalid api key
    if (result.body.result === 'SUCCESS') return true
    else return false
}

const generateSessionKey = () => {
    return randomInt(100000000).toString()
}


const isAuthorized = (sessionKey: string) => {
    return true 
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unreachable
    sessionKey in session
}

app.post('/api', async (req, res) => {
    const send = (serverRes: ServerRes) => {
        res.json(serverRes)
    }
    
    const login = async (auth: User): Promise<ServerRes> => {
        if (await checkValid(auth)) {
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
        send(await login(content))
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