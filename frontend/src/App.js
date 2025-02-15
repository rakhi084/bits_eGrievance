import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useAuthContext} from "./hooks/useAuthContext"


//pages & components
import Navbar from './components/Navbar';
import UserHome from './pages/UserHome'
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminHome from './pages/AdminHome';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? (user.role === "user" ? <UserHome/> : <AdminHome/>) : <Navigate to='/login'/>}
            />
            <Route
              path="/login"
              element={(!user)?<Login/>:<Navigate to='/'/>}
            />
            <Route
              path="/signup"
              element={(!user)?<Signup/>:<Navigate to='/'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
