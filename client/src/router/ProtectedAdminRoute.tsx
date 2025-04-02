import { Navigate } from 'react-router-dom';

type ProtectedAdminRouteProps = {
  element: React.ReactNode;
  redirectPath?: string;
};

const ProtectedAdminRoute = ({ 
  element, 
  redirectPath = '/' 
}: ProtectedAdminRouteProps) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{element}</>;
};

export default ProtectedAdminRoute;
