import { EventDetails } from '@/app/interface/eventsInterface';
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '@/app/api/events/eventsAPI';
import Link from 'next/link';

const DashboardEvents = () => {
    const [events, setEvents] = useState<EventDetails[]>([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents();
                if (data) {
                    const sortedEvents = data.sort(
                        (a: EventDetails, b: EventDetails) =>
                            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                    );
                    setEvents(sortedEvents);
                } else {
                    console.log('No data');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        loadEvents();
    }, []);

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 hover:text-red-500">
                <Link href="/users/events">Events</Link>
            </h3>
            <div className="space-y-4">
                {events.slice(0, 2).map((event) => (
                    <div
                        key={event._id}
                        className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
                    >
                        <div className="card-header mb-4">
                            <h4 className="text-sm font-semibold text-gray-800">{event.title}</h4>
                            <h4 className="text-sm font-semibold text-gray-800">{event.description}</h4>
                            <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            Event Link
                                        </a>
                        </div>
                        <div className="card-body">
                            {/* <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                <li className="hover:text-blue-500">
                                    <Link href={`/users/events/${event._id}`}>View Details</Link>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardEvents;
