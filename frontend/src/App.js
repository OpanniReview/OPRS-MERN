import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Registerationform from './pages/RegistrationForm';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import Admin from './pages/Admin';
import ConferenceList from './pages/Conferences';
import ResponsiveNavbar from './components/Navbar';
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <div className="App">
      <ResponsiveNavbar />
      <div className="pages">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
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
            <Route 
              path = "/upload"
              element = {<UploadPage />}
            />
            <Route 
              path = "/review/:paperId"
              element = {<ReviewPage />}
            />
            <Route 
              path = "/admin"
              element = {<Admin />}
            />
            <Route 
              path = "/conferences"
              element = {<ConferenceList />}
            />
            <Route 
              path = "/profile"
              element = {<ProfilePage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
