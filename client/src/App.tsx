import Login from './Login';
import ViewProject from './ViewProject';
import { auth, send } from './socket';

const App = () => {
    return (
        <>
            <button onClick={() => send({
                query: 'getProjectList',
                content: null,
                auth
            })}>
                getProjectList
            </button>
            <Login />
            <ViewProject />
        </>
    )
}


export default App;