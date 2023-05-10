import type { ClientRes } from '../../interface/clientRes'
import { ServerRes } from '../../interface/serverRes'

const requestMsg = async (clientRes: ClientRes): Promise<ServerRes> => {
    const response = await fetch('./api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientRes)
    })
    const result = await response.json() as ServerRes
    if (result.query === 'error') window.alert(`Error: ${result.content.message}`)
    else if (result.query === 'alert') window.alert(result.content.message)
    return result
}

export { requestMsg }