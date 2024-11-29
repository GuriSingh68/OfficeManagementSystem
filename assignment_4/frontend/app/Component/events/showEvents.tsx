"use client"
import { getUserRole } from '@/app/api/auth/auth';
import { createEvent, delteEvents, fetchEvents } from '@/app/api/events/eventsAPI';
import { EventDetails } from '@/app/interface/eventsInterface'
import React, { useEffect, useState } from 'react'

const ShowEvents = () => {
    const [events,setEvents]=useState<EventDetails[]>([]);
    const [newEvent, setNewEvent] = useState<any>({
        title: "",
        startDate: "",
        endDate: "",
        attendeesEmails: [],
        description: "",
        isOnline: false,
        eventLink: "",
    });
    const [createToggle,setCreateToggle]=useState<Boolean>(false);
    const role=getUserRole();
    useEffect(() => {
        try {
            const load_events = async() => {
                const data = await fetchEvents();
                if(!data){
                    throw new Error("Nothing found");
                }
                setEvents(data);
            };load_events()
        } catch (error) {
            console.error(`Err - ${error}`);
        }
     },[])

     const handle_delete=async(id:string) => {
        try {
            await delteEvents(id);
        setEvents((prev) => prev.filter((prevUsers) => prevUsers._id!==id));
        alert("event removed successfully");
        } catch (error) {
            console.log(`Error - ${error}`)
        }
     }

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name,value}=e.target;
        setNewEvent((prev: any) =>({
            ...prev,[name]:value
        }))
     }
     const validate_event = (event: EventDetails) => {
        const { title, startDate, endDate, attendeesEmails, isOnline } = event;
        
        if (!title || !startDate || !endDate || !attendeesEmails.length || isOnline === undefined) {
            alert("Fill all details");
            return false;
        }
    
        return true;
    };
     const event_creation = async() => {
        if(role==="admin"){
            console.log(`This is new event`)
            console.log(newEvent)
            if (validate_event(newEvent)) {
                try {
                    const createdEvent = await createEvent(newEvent);  
                    console.log("Created Event:", createdEvent);
    
                    if (createdEvent && createdEvent._id) {
                        alert("Event created successfully");
                        setEvents((prev) => [...prev, createdEvent]);
    
                        setNewEvent({
                            title: "",
                            startDate: "",
                            endDate: "",
                            attendeesEmails: [],
                            description: "",
                            isOnline: false,
                            eventLink: "",
                        });
                    } else {
                        alert("Failed to create event");
                    }
                } catch (error) {
                    console.error("Error creating event:", error);
                    alert("Failed to create event");
                }
            }
        } else {
            alert("Only admins can create events.");
        }
     }

  return (
    <div>
    <div className="mb-4">
                {role === "admin" && (
                    <button
                        onClick={() => setCreateToggle((prev) => !prev)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {createToggle ? "Cancel" : "Create Event"}
                    </button>
                )}
            </div>
            {createToggle ? (
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">Create New Event</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            placeholder="Event Title"
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            placeholder="Event Description"
                            className="border p-2 rounded w-full"
                        />
                    </div>  <div className="mb-4">
                        <input
                            type="text"
                            name="attendeesEmails"
                            value={newEvent.attendeesEmails.join(", ")}
                            onChange={(e) => 
                                setNewEvent((prev: any) => ({
                                    ...prev,
                                    attendeesEmails: e.target.value.split(",").map((email: string) => email.trim()) 
                                }))
                            }
                            placeholder="Enter Attendees' Emails , "
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            name="startDate"
                            value={newEvent.startDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            name="endDate"
                            value={newEvent.endDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="eventLink"
                            value={newEvent.eventLink}
                            onChange={handleInputChange}
                            placeholder="Event Link"
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mr-2">Online Event:</label>
                        <input
                            type="checkbox"
                            name="isOnline"
                            checked={newEvent.isOnline}
                            onChange={(e) =>
                                setNewEvent((prev: any) => ({
                                    ...prev,
                                    isOnline: e.target.checked,
                                }))
                            }
                        />
                    </div>
                    <button
                        onClick={event_creation}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Event
                    </button>
                </div>
            ) : (
                // Event list when the form is not visible
                <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">End Date</th>
                            <th className="border px-4 py-2">Mode</th>
                            <th className="border px-4 py-2">Link</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((e) => (
                            <tr key={e._id} className="border">
                                <td className="border px-4 py-2">{e.title}</td>
                                <td className="border px-4 py-2">{e.description}</td>
                                <td className="border px-4 py-2">{new Date(e.startDate).toLocaleString()}</td>
                                <td className="border px-4 py-2">{new Date(e.endDate).toLocaleString()}</td>
                                <td className="border px-4 py-2">{e.isOnline ? "Online" : "Offline"}</td>
                                <td className="border px-4 py-2">
                                    {e.eventLink ? (
                                        <a href={e.eventLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            Event Link
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                        <button onClick={() => handle_delete(e._id)}  className="bg-red-500 text-white px-4 py-2 rounded m-3">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
  )
}

export default ShowEvents;