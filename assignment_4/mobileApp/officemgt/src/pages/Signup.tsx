import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './signup.css';
import Header from '../components/Header';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    role: 'user',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create an account.');
      }

      setToastMessage('Signup successful!');
      setShowToast(true);

      setTimeout(() => history.push('/login'), 2000);
    } catch (error: any) {
      setToastMessage(`Error: ${error.message}`);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent className="signup-page">
        <div className="signup-container">
          <h1 className="signup-title">Sign Up</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <IonItem>
              <IonLabel position="fixed">First Name</IonLabel>
              <IonInput
                value={formData.firstName}
                onIonChange={(e) => setFormData({ ...formData, firstName: e.detail.value! })}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Last Name</IonLabel>
              <IonInput
                value={formData.lastName}
                onIonChange={(e) => setFormData({ ...formData, lastName: e.detail.value! })}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={(e) => setFormData({ ...formData, email: e.detail.value! })}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Mobile Number</IonLabel>
              <IonInput
                type="tel"
                value={formData.mobile}
                onIonChange={(e) => setFormData({ ...formData, mobile: e.detail.value! })}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Date of Birth</IonLabel>
              <IonInput
                type="date"
                value={formData.dob}
                onIonChange={(e) => setFormData({ ...formData, dob: e.detail.value! })}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput
                type="password"
                value={formData.password}
                onIonChange={(e) => setFormData({ ...formData, password: e.detail.value! })}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel>Role</IonLabel>
              <IonSelect
                value={formData.role}
                onIonChange={(e) => setFormData({ ...formData, role: e.detail.value })}
              >
                <IonSelectOption value="admin">Admin</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonButton type="submit" expand="block" className="signup-button">
              Create Account
            </IonButton>
          </form>
        </div>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
