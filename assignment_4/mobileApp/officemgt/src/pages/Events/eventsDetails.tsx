import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { EventDetails } from '../../interface/EventDetails';
import { delteEvents, fetchEventsById } from './eventsApi';

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvents] = useState<EventDetails | null>(null);
    const history = useHistory();
    useEffect(() => {
        const fetchEventDetails = async (_id:string) => {
            try {
                const res = await fetchEventsById(id);
                setEvents(res);
                console.log(res)
            } catch (error) {
                console.log('Error fetching event details:', error);
            }
        };
        fetchEventDetails(id);
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }
    const handleDeleteEvent = async () => {
        try {
            const response = await delteEvents(id);
            if (response) {
                console.log('Event deleted successfully');
               history.push("/dashboard")
            }
        } catch (error) {
            console.error('Failed to delete event', error);
        }
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonBackButton>Go Back</IonBackButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="event-details">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{event.title}</IonCardTitle>
                        </IonCardHeader>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
                        <p><strong>Attendees:</strong></p>
                        <ul>
                            {event.attendeesEmails?.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                        <IonButton
                            color="primary"
                            href={event.eventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Event Link
                        </IonButton>
                        <IonButton color="danger" onClick={handleDeleteEvent}>
                            Delete Event
                        </IonButton>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default EventDetailsPage;
