import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Registerationform from './pages/RegistrationForm';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <BrowserRouter>
          <Routes>
            <Route 
              path = "/login"
              element = {<Login />}
            />
            <Route 
              path = "/signup"
              element = {<Register />}
            />
            <Route 
              path = "/register"
              element = {<Registerationform />}
            />
            <Route 
              path = "/dashboard"
              element = {<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
