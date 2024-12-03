import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createEvent } from "./eventsApi";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { EventDetails } from "../../interface/EventDetails";

const CreateEvent: React.FC = () => {
  const [events, setEvents] = useState<any>({
    title: "",
    startDate: "",
    endDate: "",
    attendeesEmails: [] as string[],
    description: "",
    isOnline: false,
    eventLink: "",
  });

  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const addEmail = () => {
    if (email && !events.attendeesEmails.includes(email)) {
      setEvents({
        ...events,
        attendeesEmails: [...events.attendeesEmails, email],
      });
      setEmail(""); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const eventData: any = {
      title: events.title,
      startDate: events.startDate,
      endDate: events.endDate,
      attendeesEmails: events.attendeesEmails,
      description: events.description,
      isOnline: events.isOnline,
    };
  
    if (events.isOnline && events.eventLink.trim() !== "") {
      eventData.eventLink = events.eventLink;
    }
  
    try {
      const newEvent = await createEvent(eventData);
      console.log(newEvent);
      console.log(events);
      if (!newEvent) {
        setToastMessage("Failed to create event.");
      } else {
        setToastMessage("Event created successfully!");
        setTimeout(() => history.push("/dashboard"), 2000);
      }
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Error: ${error}`);
      setShowToast(true);
    }
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Title</IonLabel><br/>
              <IonInput
                value={events.title}
                onIonChange={(e) =>
                  setEvents({ ...events, title: e.detail.value! })
                }
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel><br/>
              <IonInput
                value={events.description}
                onIonChange={(e) =>
                  setEvents({ ...events, description: e.detail.value! })
                }
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Start Date</IonLabel><br/>
              <IonInput
                type="date"
                value={events.startDate}
                onIonChange={(e) =>
                  setEvents({ ...events, startDate: e.detail.value! })
                }
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">End Date</IonLabel><br/>
              <IonInput
                type="date"
                value={events.endDate}
                onIonChange={(e) =>
                  setEvents({ ...events, endDate: e.detail.value! })
                }
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Attendee Email</IonLabel><br/>
              <IonInput
                type="email"
                placeholder="Enter email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonButton slot="end" onClick={addEmail}>
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonItem>
            {events.attendeesEmails.length > 0 && (
              <IonList>
                {events.attendeesEmails.map((attendee: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                  <IonItem key={index}>
                    <IonLabel>{attendee}</IonLabel><br/>
                  </IonItem>
                ))}
              </IonList>
            )}
            <IonItem>
              <IonLabel>Online Event</IonLabel>
              <IonToggle
                checked={events.isOnline}
                onIonChange={(e) =>
                  setEvents({ ...events, isOnline: e.detail.checked })
                }
              />
            </IonItem>
            {events.isOnline && (
              <IonItem>
                <IonLabel position="floating">Event Link</IonLabel>
                <IonInput
                  type="url"
                  placeholder="Enter online event link"
                  value={events.eventLink}
                  onIonChange={(e) =>
                    setEvents({ ...events, eventLink: e.detail.value! })
                  }
                  required={events.isOnline}
                />
              </IonItem>
            )}
          </IonList>
          <IonButton expand="block" type="submit">
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateEvent;
