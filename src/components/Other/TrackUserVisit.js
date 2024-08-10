import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateLastVisit } from '../../app/features/userSlice';

const TrackUserVisit = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  useEffect(() => {

    const updateVisit = async () => { 
      try {
        dispatch(userUpdateLastVisit(token));
      } catch (error) {
        console.error('Failed to update last visit:', error);
      }
    };

    if (token) {
      updateVisit();
    }

  }, [location.pathname, dispatch, token]);

  return null;
};

export default TrackUserVisit;