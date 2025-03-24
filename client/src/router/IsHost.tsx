import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface IsHostProps {
  element: ReactElement;
}

function IsHost({ element }: IsHostProps) {
  
  const isHost = false
  
  return isHost ? element : <Navigate to="/admin-confirm" />;
}

export default IsHost;