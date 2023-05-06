import type { ClientMsg } from '../../interface/clientMsg'
import type { ServerMsg, ServerMsgAlert, ServerMsgError, ServerMsgLoginResult, ServerMsgProject, ServerMsgProjectList } from '../../interface/serverMsg'

const socket = new WebSocket('ws://localhost:3000')

function send(clientMsg: ClientMsg) {
    socket.send(JSON.stringify(clientMsg))
}

type BindQuery = {
    [T in Exclude<ServerMsg, ServerMsgError | ServerMsgAlert> as T['query']]: (content: T['content']) => void;
}

const bindQuery: BindQuery = {
    loginResult: (content: ServerMsgLoginResult["content"]) => { },
    projectList: (content: ServerMsgProjectList["content"]) => { },
    project: (content: ServerMsgProject["content"]) => { }
}

socket.onmessage = (event: MessageEvent<string>) => {
    const serverMsg = JSON.parse(event.data) as ServerMsg
    const { query, content } = serverMsg
    if (query === "error") {
        window.alert(`Error: ${content.message}`)
        return
    }
    if (query === 'alert') {
        window.alert(content.message)
        return
    }
    // @ts-ignore
    bindQuery[query](content)
}

export { socket, send, bindQuery }