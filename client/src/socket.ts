const socket = new WebSocket('ws://localhost:3000')

type auth = { token: string, id: string, pw: string }

const data: { auth: auth, [key: string]: object } = {
    auth: {
        token: window.localStorage['token'],
        id: window.localStorage['id'],
        pw: window.localStorage['pw']
    }
}

let msg: { type: string, content: object }
socket.onmessage = (event) => {
    msg = JSON.parse(event.data)
    data[msg.type] = msg.content
}

function send(type: string, content: object) {
    socket.send(JSON.stringify({
        type,
        content,
        auth: data.auth
    }))
}

export { data, send }