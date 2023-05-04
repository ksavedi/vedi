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

//웹소켓 통신
import { WebSocket } from 'ws'
import { reply } from './reply'
import type { Auth } from './interface/msg'
import type { ServerMsg, ServerMsgProjectList } from './interface/serverMsg'
import type { ClientMsg } from './interface/clientMsg'
import { Project } from './class/project'

//가온누리 api로 check
const checkValid = (user: Auth) => {
    alert(JSON.stringify(user))
    return true
}

const getProjectList = (user: Auth): ServerMsgProjectList => {
    const resProjectList = []

    for (const project of Project.list) {
        if (project.isPublic || project.hasMember(user.id)) {
            resProjectList.push(project)
        }
    }

    return {
        query: 'projectList',
        content: {
            projectList: resProjectList
        }
    }
}

const login = (user: Auth, auth: Auth): ServerMsg => {
    if (checkValid(auth)) {
        user.id = auth.id
        user.pw = auth.pw
        return getProjectList(user)
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

const isAuthorized = (user: Auth, auth: Auth) => {
    if (user.id === null) return false
    return user.id === auth.id && user.pw === auth.pw
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

    socket.on('message', (data: string) => {
        const clientMsg = JSON.parse(data.toString()) as ClientMsg
        const { query, /* content, */ auth } = clientMsg
        if (query === 'login') {
            return send(login(user, auth))
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