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
                if (!res) {
                    console.log('Error in fetching events');
                    return;
                }
                const sortedEvents = res.sort(
                    (a: EventDetails, b: EventDetails) =>
                        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                );
                setEvents(sortedEvents);
            } catch (error) {
                console.log('Error fetching events:', error);
            }
        };
        loadEvents();
    }, [location]);

    return (
        <IonContent>
            <div className="events-container">
                {events.map((event) => (
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
                ))}
                <IonButton color="primary" onClick={() => history.push('/create-event')}>
                    Create Event
                </IonButton>
            </div>
        </IonContent>
    );
};

export default Events;
