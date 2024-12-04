import { useEffect, useState } from 'react';
import { fetchEvents } from '@/app/api/events/eventsAPI';
import { EventDetails } from '@/app/interface/eventsInterface';
import EventDetailsComponent from '@/app/Component/events/CreateEventDetails';

const DashboardEvents = () => {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        if (Array.isArray(data)) {
          const sortedEvents = data.sort(
            (a: EventDetails, b: EventDetails) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          setEvents(sortedEvents);
        } else {
          console.log('No data or data is not an array');
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    loadEvents();
  }, []);

  const handleViewDetails = (event: EventDetails) => {
    setSelectedEvent(event); 
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 hover:text-red-500">Events</h3>
      <div className="space-y-4">
        {events.slice(0, 2).map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
          >
            <div className="card-header mb-4">
              <h4 className="text-sm font-semibold text-gray-800">{event.title}</h4>
              <h4 className="text-sm font-semibold text-gray-800">{event.description}</h4>
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Event Link
              </a>
            </div>
            <div className="card-body">
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="hover:text-blue-500">
                  <button onClick={() => handleViewDetails(event)}>View Details</button>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventDetailsComponent event={selectedEvent} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default DashboardEvents;
