import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import LogoutButton from './Buttons/LogoutButton';

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <Link to="/about">
            <IonButton fill="clear" color="light">
              About
            </IonButton>
          </Link>
        </IonButtons>
        <IonButtons slot="end">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <>
              <Link to="/login">
                <IonButton fill="clear" color="light">
                  Login
                </IonButton>
              </Link>
              <Link to="/signup">
                <IonButton fill="clear" color="light">
                  Sign Up
                </IonButton>
              </Link>
            </>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
