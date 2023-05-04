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
import type { Auth, ClientMsg, ServerMsg } from './interface'
import { Project } from './class/project'

const generateToken = () => randomInt(1000000000000).toString()

//가온누리 api로 check
const checkValid = () => true

const login = (user: Auth, auth: Auth): ServerMsg => {
    if (checkValid()) {
        user.token = generateToken()
        user.id = auth.id
        user.pw = auth.pw
        return {
            query: 'token',
            content: {
                token: user.token
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

const isAuthorized = (user: Auth, auth: Auth) => {
    if (user.token === null || user.token === undefined) return false
    return (
        user.token === auth.token
        && user.id === auth.id
        && user.pw === auth.pw
    )
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
        const { query, content, auth } = clientMsg
        console.log(content)
        if (query === 'login') {
            console.log(clientMsg)
            return send(login(user, auth))
        }
        if (!isAuthorized(user, auth)) {
            return send({
                query: 'error',
                content: {
                    message: 'invalid user'
                }
            })
        }
        
        if (query === 'getProjectList') {
            const resProjectList = []

            for (const project of Project.list) {
                if (project.isPublic || project.hasMember(user.id)) {
                    resProjectList.push(project)
                }
            }

            return send({
                query: 'projectList',
                content: {
                    projectList: resProjectList
                }
            })
        }

        if (query === 'openProject') {
            const name = content.projectName
            if (!Project.has(name) || !Project.get(name).hasMember(user.id)) {
                return send({
                    query: 'error',
                    content: {
                        message: 'project does not exist or you do not have authority'
                    }
                })
            }

            return send({
                query: 'project',
                content: {
                    project: Project.get(name)
                }
            })
        }

    })
})