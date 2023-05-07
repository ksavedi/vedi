import Login from './Login';
import ProjectInfo from './ProjectInfo';
import ViewProject from './ViewProject';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project" element={<ViewProject />} />
            <Route path="/project/:name" element={<ProjectInfo />} />
        </Routes>
    </BrowserRouter>

export default App;