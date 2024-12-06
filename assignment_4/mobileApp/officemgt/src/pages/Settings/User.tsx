import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import { useEffect, useState } from 'react'
import LogoutButton from '../../components/Buttons/LogoutButton'
import { UserInterface } from '../../interface/UserDetails'
import { deleteUsers, fetchUsers } from './userApi'
import { useHistory } from 'react-router'
import { getUserId } from '../../utils/jwtUtils'

const User = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const history = useHistory();
    const userId = getUserId();
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchUsers();
                if (response)
                    setUsers(response);
                else {
                    console.log("No users found");
                }
            } catch (error) {
                console.log(`Error in users - ${error}`)
            }
        };
        loadUsers()
    }, [])


    const handleDeleteUser = async (id: string) => {
        try {
            const response = await deleteUsers(id);
            if (response) {
                console.log('Event deleted successfully');
                alert("Redirecting to dashboard")
                setUsers(users.filter(user => user._id !== id))
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
                        <LogoutButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="events-container">
                    <h2 className="event-title">Welcome to admin settings</h2>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <IonCard key={user._id} className="event-card">
                                <IonCardHeader>
                                    <IonCardTitle className="event-title">{user.email}</IonCardTitle>
                                </IonCardHeader>
                                <p className="event-description">{user.firstName}</p>
                                <p className="event-description">{user.lastName}</p>
                                <p className="event-description">{user.mobile}</p>
                                <p className="event-description">{user.role}</p>
                                {user._id !== userId ? (
                                    <IonButton color="danger" onClick={() => handleDeleteUser(user._id)}>
                                        Delete User
                                    </IonButton>
                                ) : null}
                            </IonCard>
                        ))
                    ) : (
                        <p>No users available. Create one!</p>
                    )}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default User
