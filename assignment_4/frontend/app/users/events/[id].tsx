import { fetchEventsById } from '@/app/api/events/eventsAPI';
import { EventDetails } from '@/app/interface/eventsInterface';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EventDetailsById = () => {
    
    const router=useRouter();
    const {id} = router.query;
    const [events,setEvents]=useState<EventDetails[]>([]);
    useEffect(() => {
        const loadEventsById = async (eventId: string) => {
            try {
                const eventDetails = await fetchEventsById(eventId);
                if (eventDetails) {
                    setEvents(eventDetails);
                }
            } catch (error) {
                console.error('Failed to fetch event details:', error);
            }
        };

        if (typeof id === 'string') {
            loadEventsById(id); 
        }
    }, [id]);

  return (
    <div className="mt-6 max-w-3xl mx-auto">
            {
                events.map((ev) => (
                    <>
                    <h1 className="text-2xl font-bold mb-4">{ev.title}</h1>
            <p className="text-gray-700 mb-4">{ev.description}</p>
            <a href={ev.eventLink} target="_blank" className="text-blue-500 hover:underline">
                Event Link
            </a>
            </>
                ))
            }
            <div className="mt-6">
                <button
                    onClick={() => router.back()}
                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default EventDetailsById