import type { ClientMsg } from '../../interface/clientMsg'
import { ServerMsg } from '../../interface/serverMsg'

const requestMsg = async (clientMsg: ClientMsg): Promise<ServerMsg> => {
    const response = await fetch('./api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientMsg)
    })
    const result = await response.json() as ServerMsg
    if (result.query === 'error') window.alert(`Error: ${result.content.message}`)
    else if (result.query === 'alert') window.alert(result.content.message)
    return result
}

export { requestMsg }