async function fetchEvents() {
    try {
        // Fetch events directly from the API
        const res = await fetch("http://localhost:3000/events");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const events = await res.json();
        console.log(events);
        displayEvents(events);
    } catch (error) {
        console.error(`Error loading data - ${error.message}`);
    }
}

function displayEvents(events) {
    const eventContainer = document.getElementById("event-container");
    eventContainer.innerHTML = '';
    
    // Display only the first two events as per the original requirement
    const displayedEvents = events.slice(0, 2);
    displayedEvents.forEach((event) => {
        const eventElement = `
        <div class="bg-white p-4 rounded-lg shadow-md mt-4 mx-2 font-large w-80">
            <h4 class="text-lg font-semibold bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded-lg">${event.title}</h4>
            <p class="text-gray-500 mt-2 text-lg font-semibold">Assigned to: ${event.name}</p>
            <p class="text-gray-500">Start Date: ${new Date(event.date).toLocaleString()}</p>
            <p class="text-gray-500">Attendees: ${event.attendeesEmails.join(", ")}</p>
        </div>`;
        eventContainer.innerHTML += eventElement;
    });
}

document.addEventListener("DOMContentLoaded", fetchEvents);
