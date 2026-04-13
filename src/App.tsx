import { Routes, Route, } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/User/Dashboard';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Verify from './pages/User/Verify';
import Landingpage from './pages/User/Landingpage'

function App() {
  const authProps = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login auth={authProps} />} />
      <Route path="/register" element={<Register auth={authProps} />} />
      <Route path="/verify" element={<Verify auth={authProps} />} />
      <Route path="/dashboard" element={<Dashboard  />} />
    </Routes>
  );
}

export default App;
