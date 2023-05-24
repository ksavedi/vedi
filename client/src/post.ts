import type { ClientRes } from '../../interface/clientRes'
import { ServerRes } from '../../interface/serverRes'

const requestMsg = async (clientRes: ClientRes): Promise<ServerRes> => {
    const response = await fetch('http://localhost/api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientRes)
    })
    const data = await response.json() as ServerRes
    if (data.query === 'error') window.alert(`Error: ${data.content.message}`)
    else if (data.query === 'alert') window.alert(data.content.message)
    return data
}

export { requestMsg }