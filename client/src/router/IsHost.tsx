import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { userStoreType } from '../store/reducers/user.reducers';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IsHostProps {
  element: ReactElement;
}

function IsHost({ element }: IsHostProps) {
    const { isHost}: userStoreType = useSelector(
      (state: RootState) => state.userReducer
    );
    
  return isHost ? element : <Navigate to="/host-confirm" />;
}

export default IsHost;