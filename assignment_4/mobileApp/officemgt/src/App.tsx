import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
import "./styles/tailwind.css"
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard/dashboard';
import Events from './pages/Events/Events';
import EventDetailsPage from './pages/Events/eventsDetails';
import CreateEvent from './pages/Events/CreateEvent';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute path="/events" component={Events} exact />
          <PrivateRoute path="/events/:id" component={EventDetailsPage} exact />
          <PrivateRoute path="/create-event" component={CreateEvent} exact />
      </IonRouterOutlet>
    </IonReactRouter>
      </IonApp>
);

export default App;