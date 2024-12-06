import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/react';
import { EventDetails } from '../../interface/EventDetails';
import { useHistory, useLocation } from 'react-router';
import { TaskInterface } from '../../interface/TaskInterface';
import { fetchTasks } from './taskApi';

const Events: React.FC = () => {
    const [events, setEvents] = useState<TaskInterface[]>([]);
    const history = useHistory();
    const location = useLocation(); 

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const res = await fetchTasks();
                if (Array.isArray(res)) {
                    setEvents(res);
                } else {
                    console.log(' empty array.');
                    setEvents([]); 
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]); 
            }
        };
        loadEvents();
    }, [location]);

    return (
        <IonContent>
            <div className="events-container">
                {events.length > 0 ? (
                    events.map((event) => (
                        <IonCard key={event._id} className="event-card">
                            <IonCardHeader>
                                <IonCardTitle className="event-title">{event.taskName}</IonCardTitle>
                            </IonCardHeader>
                            <p className="event-description">{event.description}</p>
                            <IonButton color="secondary" onClick={() => history.push(`/tasks/${event._id}`)}>
                                View Details
                            </IonButton>
                        </IonCard>
                    ))
                ) : (
                    <p>No events available. Create one!</p>
                )}
                <IonButton color="primary" onClick={() => history.push('/create-tasks')}>
                    Create Tasks
                </IonButton>
            </div>
        </IonContent>
    );
};

export default Events;
