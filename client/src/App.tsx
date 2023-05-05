import Login from './Login';
import ViewProject from './ViewProject';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project" element={<ViewProject />} />
        </Routes>
    </BrowserRouter>

export default App;