import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchUserByToken, setLoading } from './features/userSlice';
import { getItemWithExpiration } from '../utils/localStorageHelpers';
import { Toaster } from 'react-hot-toast';

import './App.css';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Login from '../pages/Login/Login';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import Welcome from '../pages/Welcome/Welcome';

import i18n from './i18n';

function App() {
  const language = useSelector((state) => state.translation.language);
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const token = getItemWithExpiration('findcv_user');

    if (token) {
      dispatch(fetchUserByToken(token));
    }
    else {
      dispatch(setLoading(false));
    }

  }, [dispatch]);

  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={
          <ProtectedRoute userStatus="notLoggedIn">
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/reset-password" element={
          <ProtectedRoute userStatus="notLoggedIn">
            <ResetPassword />
          </ProtectedRoute>
        } />
        <Route path="/create-account" element={
          <ProtectedRoute userStatus="notLoggedIn">
            <CreateAccount />
          </ProtectedRoute>
        } />
        <Route path="/welcome" element={
          <ProtectedRoute userStatus="loggedIn">
            <Welcome />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
