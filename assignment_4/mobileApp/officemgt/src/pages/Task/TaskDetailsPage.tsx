import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { EventDetails } from '../../interface/EventDetails';
import { deleteTask, fetchTaskById } from './taskApi';
import { TaskInterface } from '../../interface/TaskInterface';

const TaskDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tasks, setTasks] = useState<TaskInterface | null>(null);
    const history = useHistory();
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const res = await fetchTaskById(id);
                if (!res || !res._id) {
                    console.error("Task not found");
                    alert("Task not found!");
                    history.push("/dashboard");
                } else {
                    setTasks(res);
                }
            } catch (error) {
                console.error("Error fetching task details:", error);
                history.push("/dashboard");
                 alert("Failed to fetch task details!");
            }
        };
        fetchTaskDetails();
    }, [id]);
    
    if (!tasks) {
        return <div>Loading...</div>;
    }
    const handleDeleteTask = async () => {
        try {
            const response = await deleteTask(id);
            if (response) {
                alert('Task deleted successfully');
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
                <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="Go Back" />
        </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="event-details">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{tasks.taskName}</IonCardTitle>
                        </IonCardHeader>
                        <p><strong>Description:</strong> {tasks.description}</p>
                        <p><strong>Start Date:</strong> {new Date(tasks.start_date).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(tasks.end_date).toLocaleDateString()}</p>
                        <p><strong>Assigned to:</strong> {tasks.assigned}</p>
                        <p><strong>Assignee:</strong> {tasks.assignee}</p>
                        <p><strong>Priority:</strong> {tasks.priority}</p>

                        <IonButton color="danger" onClick={handleDeleteTask}>
                            Delete Event
                        </IonButton>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default TaskDetailsPage;
