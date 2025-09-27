import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import RequireAuth from './routes/RequireAuth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />

                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;