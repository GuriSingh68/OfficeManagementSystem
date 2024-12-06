import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonToast,
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import './login.css';
import Header from '../components/Header';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { setIsAuthenticated } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const data = await response.json();
      const { accessToken } = data;

      localStorage.clear();
      localStorage.setItem('accessToken', accessToken);

      setIsAuthenticated(true);
      history.push('/dashboard');
    } catch (err: any) {
      setToastMessage(err.message || 'Something went wrong');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent class="login-page">
        <div>
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <IonItem className="inputForm">
              <IonLabel position="fixed">Email</IonLabel>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                type="email"
                required
              />
            </IonItem>

            <IonItem className="inputForm">
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                type="password"
                required
              />
            </IonItem>

            <IonButton type="submit">Login</IonButton>
          </form>
        </div>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
