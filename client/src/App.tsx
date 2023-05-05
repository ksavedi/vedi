import Login from './Login';
import ViewProject from './ViewProject';
import { auth, send } from './socket';
import './App.css'

const App = () => {
    return (
        <>
            <div id="nevigation-bar">
                <button
                    id="project-list-button"
                    onClick={() => send({
                        query: 'getProjectList',
                        content: null,
                        auth
                    })}
                >
                    Test
                </button>
            </div>
            <Login />
            <ViewProject />
        </>
    )
}


export default App;