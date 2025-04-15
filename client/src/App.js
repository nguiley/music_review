import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewReviewPage from './pages/NewReviewPage';
import MyNavbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SongPage from './pages/SongPage';
import { AuthProvider } from './contexts/authContext/index.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MyNavbar></MyNavbar>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/NewReviewPage' element={<NewReviewPage />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/RegisterPage' element={<RegisterPage />} />
          <Route path="/:track_id" element={<SongPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
