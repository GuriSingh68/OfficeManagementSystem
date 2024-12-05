import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/react';
import { EventDetails } from '../../interface/EventDetails';
import { fetchEvents } from './eventsApi';
import './events.css';
import { useHistory, useLocation } from 'react-router';

const Events: React.FC = () => {
    const [events, setEvents] = useState<EventDetails[]>([]);
    const history = useHistory();
    const location = useLocation(); 

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const res = await fetchEvents();
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
                                <IonCardTitle className="event-title">{event.title}</IonCardTitle>
                            </IonCardHeader>
                            <p className="event-description">{event.description}</p>
                            <IonButton
                                color="primary"
                                href={event.eventLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Event Link
                            </IonButton>
                            <IonButton color="secondary" onClick={() => history.push(`/events/${event._id}`)}>
                                View Details
                            </IonButton>
                        </IonCard>
                    ))
                ) : (
                    <p>No events available. Create one!</p>
                )}
                <IonButton color="primary" onClick={() => history.push('/create-event')}>
                    Create Event
                </IonButton>
            </div>
        </IonContent>
    );
};

export default Events;
