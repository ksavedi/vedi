import type { Auth } from '../../interface/msg'
import type { ClientMsg } from '../../interface/clientMsg'
import type { ServerMsg, ServerMsgProjectList, ServerMsgToken } from '../../interface/serverMsg'

const socket = new WebSocket('ws://localhost:3000')

const auth: Auth = {
    token: window.localStorage['token'],
    id: window.localStorage['id'],
    pw: window.localStorage['pw']
}

function send(clientMsg: ClientMsg) {
    socket.send(JSON.stringify(clientMsg))
}

type BindQuery = Record<
    ServerMsg['query'],
    (content: ServerMsg['content']) => {}
>
const bindQuery: BindQuery = {
    token: (content: ServerMsgToken['content']) => {},
    projectList: (content: ServerMsgProjectList) => {},
    project: (content) => {}
}

socket.onmessage = (event: MessageEvent<string>) => {
    const serverMsg = JSON.parse(event.data) as ServerMsg
    const { query, content } = serverMsg
    if (query === "error") {
        window.alert(`Error: ${content.message}`)
    }
    else if (query === 'alert') {
        window.alert(content.message)
    }
    else {
        bindQuery[query](content)
    }
}

export { socket, auth, send, bindQuery }