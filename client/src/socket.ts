import type { Auth, ClientMsg } from '../../interface'
import { ServerMsg } from "../../interface"

const socket = new WebSocket('wss://localhost:3000')

const auth: Auth = {
    token: window.localStorage['token'],
    id: window.localStorage['id'],
    pw: window.localStorage['pw']
}

function send(clientMsg: ClientMsg) {
    socket.send(JSON.stringify(clientMsg))
}

socket.onmessage = (event: MessageEvent<string>) => {
    const serverMsg = JSON.parse(event.data) as ServerMsg
    const { query, content } = serverMsg
    if (query === "error") {
        window.alert(content.message)
        return
    }
    if (query === "token") {
        return
    }
    if (query === "projectList") {
        return
    }
    if (query === "project") {
        return
    }
}

export { socket, auth, send }