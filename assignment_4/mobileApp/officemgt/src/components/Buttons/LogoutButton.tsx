// Button/Logout.tsx
import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/login');
  };

  return (
    <IonButton onClick={handleLogout} fill="clear" color="dark">
      Logout
    </IonButton>
  );
};

export default LogoutButton;
