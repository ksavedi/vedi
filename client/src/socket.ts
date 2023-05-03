import type { Auth } from '../../interface'
const socket = new WebSocket('ws://localhost:3000')

const auth: Auth = {
    token: window.localStorage['token'],
    id: window.localStorage['id'],
    pw: window.localStorage['pw']
}

function send(type: string, content: object) {
    socket.send(JSON.stringify({
        type,
        content,
        auth
    }))
}

export { auth, send }