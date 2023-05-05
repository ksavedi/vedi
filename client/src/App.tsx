import Login from './Login';
import { auth, bindQuery, send, socket } from './socket';
import { useEffect, useState } from 'react';
import { ServerMsgAuthorized } from '../../interface/serverMsg';
import ViewProject from './ViewProject';

const App = () => {
    const [authorized, setAuthorized] = useState<boolean>(false);

    useEffect(() => {
        bindQuery.authorized = (content: ServerMsgAuthorized['content']) => {
            setAuthorized(content.authorized)
        }
    })

    socket.addEventListener('open', () => {
        send({
            query: 'getAuthorized',
            content: null,
            auth
        })
    })

    if (authorized) return <ViewProject />
    return <Login />
}

export default App;