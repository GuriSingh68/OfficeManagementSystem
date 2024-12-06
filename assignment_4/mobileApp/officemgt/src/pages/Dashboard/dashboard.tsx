import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../../components/Buttons/LogoutButton';
import Events from '../Events/Events';
import Tasks from '../Task/Task';
import User from '../Settings/User';
import { personCircleOutline } from 'ionicons/icons'; 
import { IonReactRouter } from '@ionic/react-router'; 
import { Route, Redirect } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <IonPage>
      <IonHeader style={{ backgroundColor: 'black', color: 'white' }}>
        <IonToolbar>
          <LogoutButton />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ backgroundColor: 'purple', color: 'white' }}>Dashboard</h2>
        <h2 style={{ backgroundColor: 'lightsteelblue', color: 'black' }}>Tasks</h2>
        <Tasks />
        <h2 style={{ backgroundColor: 'lightsteelblue', color: 'black' }}>Events</h2>
        <Events />
      </IonContent>

      <IonTabBar slot="bottom">
        <IonTabButton tab="user" href="/settings">
          <IonIcon icon={personCircleOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default Dashboard;
