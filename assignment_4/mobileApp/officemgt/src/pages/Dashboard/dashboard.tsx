import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/react';
import LogoutButton from '../../components/Buttons/LogoutButton';
import Events from '../Events/Events';
import Tasks from '../Task/Task';

const Dashboard: React.FC = () => {
  return (
    <IonPage>
     <IonHeader style={{ backgroundColor: 'black', color: 'white' }}> 
      <IonToolbar>
        <LogoutButton />
      </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ backgroundColor: 'grey', color: 'white' }}>Dashboard</h2>
       <IonContent>
        <h2 style={{ backgroundColor: 'grey', color: 'white' }}>Tasks</h2>
        <Tasks />
       </IonContent>
      </IonContent>
      <IonContent>
      <h2 style={{ backgroundColor: 'grey', color: 'white' }}>Events</h2>
      <Events />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
