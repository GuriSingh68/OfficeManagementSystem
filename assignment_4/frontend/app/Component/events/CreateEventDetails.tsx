import React from 'react';
import { EventDetails } from '@/app/interface/eventsInterface';

interface EventDetailsComponentProps {
  event: EventDetails;
  onClose: () => void;
}

const EventDetailsComponent: React.FC<EventDetailsComponentProps> = ({ event, onClose }) => {
  return (
    <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-700 mb-4">{event.startDate}</p>
      <p className="text-gray-700 mb-4">{event.endDate}</p>
      <p className="text-gray-700 mb-4">{event.attendeesEmails}</p>
      <p className="text-gray-700 mb-4">{event.eventLink}</p>
      <a href={event.eventLink} target="_blank" className="text-blue-500 hover:underline">
        Event Link
      </a>
      <div className="mt-6">
        <button
          onClick={onClose}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailsComponent;
