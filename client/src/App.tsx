import CreateProject from './CreateProject';
import Login from './Login';
import ProjectFile from './ProjectFile';
import ManageProject from './ManageProject';
import ViewProject from './ViewProject';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectReadme } from './ProjectReadme';

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project" element={<ViewProject />} />
            <Route path="/project/:name" element={<ProjectFile />} />
            <Route path="/project/:name/info" element={<ProjectReadme />} />
            <Route path="/project/:name/changeInfo" element={<ManageProject />} />
            <Route path="/create" element={<CreateProject />} />
        </Routes>
    </BrowserRouter>

export default App;