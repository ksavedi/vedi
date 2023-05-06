import type { ClientMsg } from '../../interface/clientMsg'

const send = async (clientMsg: ClientMsg) => {
    const response = await fetch('./api', {
        method: 'POST',
        body: JSON.stringify(clientMsg)
    })
    return response.json()
}

export { send }