import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/react';
import LogoutButton from '../../components/Buttons/LogoutButton';
import Events from '../Events/Events';

const Dashboard: React.FC = () => {
  return (
    <IonPage>
     <IonHeader style={{ backgroundColor: 'black', color: 'white' }}> 
      <IonToolbar>
        <LogoutButton />
      </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Dashboard</h2>
        <Events />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
