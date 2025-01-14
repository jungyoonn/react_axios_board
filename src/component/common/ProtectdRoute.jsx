import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const ProtectdRoute = ({children}) => {
  // const token = localStorage.getItem('token');
  const {token} = useAuth();

  if(!token) {
    return <Navigate to={'/'} replace />
  }
  
  return children;
}

export default ProtectdRoute;
