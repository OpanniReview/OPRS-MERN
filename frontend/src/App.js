import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registerationform from './pages/RegistrationForm';
import Register from './pages/Register';
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
              path = "/register"
              element = {<Register />}
            />
            <Route 
              path = "/register2"
              element = {<Registerationform />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
