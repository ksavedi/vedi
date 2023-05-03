import type { Auth, ClientMsg } from '../../interface'
const socket = new WebSocket('ws://localhost:3000')

const auth: Auth = {
    token: window.localStorage['token'],
    id: window.localStorage['id'],
    pw: window.localStorage['pw']
}

function send(clientMsg: ClientMsg) {
    socket.send(JSON.stringify(clientMsg))
}

export { auth, send }