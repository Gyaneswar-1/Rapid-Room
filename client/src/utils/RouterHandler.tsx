import { BrowserRouter, Routes,Route } from 'react-router-dom';
import RegisterPage from '../pages/Signup';
import Signin from '../pages/Signin';
import HomePage from '../pages/HomePage';
// import NotFoundPage from '../pages/NotFoundPage';
import { Navigate } from 'react-router-dom';

function RouterHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterHandler;
