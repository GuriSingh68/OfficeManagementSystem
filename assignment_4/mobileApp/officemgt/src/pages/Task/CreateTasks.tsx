import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { TaskInterface } from '../../interface/TaskInterface';
import { createTask } from './taskApi';
import styles from './CreateTask.module.css';


const CreateTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Omit<TaskInterface, '_id'>>({
    taskName: '',
    assignee: '',
    assigned: "", 
    start_date: '',
    end_date: '',
    project: '',
    priority: '',
    status: '',
    description: '',
  });
  const [newAssignee, setNewAssignee] = useState(''); 
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  // const addAssignee = () => {
  //   if (newAssignee.trim() === '') {
  //     setToastMessage('Assignee name cannot be empty.');
  //     setShowToast(true);
  //     return;
  //   }

  //   setTasks((prev) => ({
  //     ...prev,
  //     assigned: [...prev.assigned, newAssignee.trim()],
  //   }));
  //   setNewAssignee('');
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(tasks)
    if (!tasks.taskName || !tasks.start_date || !tasks.end_date) {
      setToastMessage('Please fill out all required fields.');
      setShowToast(true);
      return;
    }

    try {
      
      await createTask(tasks); 

      setToastMessage('Task created successfully!');
      setShowToast(true);

      setTimeout(() => {
        history.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      setToastMessage(error.message || 'Failed to create task.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/dashboard" text="Go Back" />
      </IonButtons>
      <IonLabel>Create Task</IonLabel>
    </IonToolbar>
  </IonHeader>
  <IonContent className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Create Task</h1>
      <IonList>
        <IonItem>
          <IonLabel position="fixed">
            <h2>Task Name</h2>
          </IonLabel>
          <IonInput
            value={tasks.taskName}
            onIonChange={(e) =>
              setTasks({ ...tasks, taskName: e.detail.value! })
            }
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Assignee</IonLabel>
          <IonInput
            value={tasks.assignee}
            onIonChange={(e) =>
              setTasks({ ...tasks, assignee: e.detail.value! })
            }
          />
        </IonItem>
        <IonItem>
        <IonLabel position="fixed">Assignee</IonLabel>
          <IonInput
            value={tasks.assigned}
            onIonChange={(e) =>
              setTasks({ ...tasks, assigned: e.detail.value! })
            }
          />

</IonItem> 
          {/* <IonLabel position="fixed">Add Assigned Person</IonLabel>
          <IonInput
            placeholder="Enter assignee name"
            value={newAssignee}
            onIonChange={(e) => setNewAssignee(e.detail.value!)}
          />
          <IonButton slot="end" onClick={addAssignee} className={styles['button-primary']}>
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonItem> */}
        {/* {tasks.assigned.length > 0 && (
          <ul className={styles['assigned-list']}>
            {tasks.assigned.map((assignee, index) => (
              <li key={index} className={styles['assigned-list-item']}>
                <IonLabel>{assignee}</IonLabel>
              </li>
            ))}
          </ul>
        )} */}
        <IonItem>
          <IonLabel position="fixed">Start Date</IonLabel>
          <IonInput
            type="date"
            value={tasks.start_date}
            onIonChange={(e) =>
              setTasks({ ...tasks, start_date: e.detail.value! })
            }
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">End Date</IonLabel>
          <IonInput
            type="date"
            value={tasks.end_date}
            onIonChange={(e) =>
              setTasks({ ...tasks, end_date: e.detail.value! })
            }
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Project</IonLabel>
          <IonInput
            value={tasks.project}
            onIonChange={(e) =>
              setTasks({ ...tasks, project: e.detail.value! })
            }
          />
        </IonItem>
        <IonItem>
          <IonLabel>Priority</IonLabel>
          <IonSelect
            value={tasks.priority}
            onIonChange={(e) =>
              setTasks({ ...tasks, priority: e.detail.value! })
            }
          >
            <IonSelectOption value="low">low</IonSelectOption>
            <IonSelectOption value="moderate">moderate</IonSelectOption>
            <IonSelectOption value="high">high</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Status</IonLabel>
          <IonSelect
            value={tasks.status}
            onIonChange={(e) =>
              setTasks({ ...tasks, status: e.detail.value! })
            }
          >
            <IonSelectOption value="pending">pending</IonSelectOption>
            <IonSelectOption value="done">done</IonSelectOption>
            <IonSelectOption value="In Progress">In Progress</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea
            value={tasks.description}
            onIonChange={(e) =>
              setTasks({ ...tasks, description: e.detail.value! })
            }
          />
        </IonItem>
      </IonList>
      <IonButton expand="block" type="submit" className={styles['button-primary']}>
        Submit
      </IonButton>
    </form>
    <IonToast
      isOpen={showToast}
      message={toastMessage}
      duration={2000}
      onDidDismiss={() => setShowToast(false)}
    />
  </IonContent>
</IonPage>
  );
};

export default CreateTasks;
