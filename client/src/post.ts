import type { ClientMsg } from '../../interface/clientMsg'

function send(clientMsg: ClientMsg) {
    fetch('./api', {
        method: 'POST',
        body: JSON.stringify(clientMsg)
    }).then((res) => res.json())
    .then((result) => { console.log(result) })
}

export { send }