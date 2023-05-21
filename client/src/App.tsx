import CreateProject from './CreateProject';
import Login from './Login';
import ProjectFile from './ProjectFile';
import ViewProject from './ViewProject';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project" element={<ViewProject />} />
            <Route path="/project/:name" element={<ProjectFile />} />
            <Route path="/project/:name/setting" element={<ProjectFile />} />
            <Route path="/create" element={<CreateProject />} />
        </Routes>
    </BrowserRouter>

export default App;