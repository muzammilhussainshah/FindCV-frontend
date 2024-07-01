import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken, setLoading } from './features/userSlice';
import { getItemWithExpiration } from '../utils/localStorageHelpers';

import RoutesSetup from './routes';

import './App.css';

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
    <RoutesSetup />
  );
}

export default App;
