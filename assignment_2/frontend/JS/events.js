$(document).ready(function () {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
        events: [], // Leave empty initially; you can populate it with a fetch function
        editable: true,
        eventClick: function (event, element) {
            $('#eventModal').show();
            $('#eventTitle').val(event.title);
            $('#eventDate').val(moment(event.start).format('YYYY-MM-DD'));
            $('#eventTime').val(moment(event.start).format('HH:mm'));
            $('#deleteEventButton').show().click(function () {
                $('#calendar').fullCalendar('removeEvents', event._id);
                $('#eventModal').hide();
            });
        }
    });

    // Open modal for adding new event
    $('#addEventButton').click(function () {
        $('#eventForm')[0].reset();
        $('#deleteEventButton').hide();
        $('#eventModal').show();
    });

    // Close modal
    $('#closeModalButton').click(function () {
        $('#eventModal').hide();
    });

    // Save event and post to backend
    $('#saveEventButton').click(function (e) {
        e.preventDefault();

        // Collect event data
        const eventData = {
            title: $('#eventTitle').val(),
            date: `${$('#eventDate').val()}T${$('#eventTime').val()}:00Z`,
            attendeesEmails: $('#email-tags').text().split(',').map(email => email.trim())
        };

        // Post event data to backend
        fetch('http://localhost:3000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Event created successfully:', data);
            
            // Render the event on the calendar
            $('#calendar').fullCalendar('renderEvent', {
                title: data.title,
                start: data.date
            }, true);
            
            // Close the modal
            $('#eventModal').hide();
        })
        .catch(error => console.error('Error creating event:', error));
    });
});
