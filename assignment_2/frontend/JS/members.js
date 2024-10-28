document.addEventListener('DOMContentLoaded', function () {
  const memberDetailsBtn = document.getElementById('memberDetails');
  const detailsForm = document.getElementById('detailsForm');
  const addMemberForm = document.getElementById('add-member-form');

  if (memberDetailsBtn && detailsForm) {
      memberDetailsBtn.addEventListener('click', function () {
          detailsForm.classList.toggle('hidden');
      });
      console.log("Clicked")
  }

  // Form submission logic
  if (addMemberForm) {
      addMemberForm.addEventListener('submit', async function (e) {
          e.preventDefault(); // Prevent the form from submitting the traditional way

          // Collect form data
          const member = {
              empId: document.getElementById('empId').value,  
              name: document.getElementById('name').value,  
              email: document.getElementById('email').value,
              role: document.getElementById('role-select').value,
              team: document.getElementById('team').value
          };
          console.log(member)

          try {
              // Make the POST request
              const response = await fetch('http://localhost:3000/add-members', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(member)
              });

              const result = await response.json();
              console.log(result)
              
              if (response.ok) {
                  alert(result.message); // Display success message
                  addMemberForm.reset(); // Clear the form fields after submission
              } else {
                  console.error(result); // Log error if response is not OK
              }
          } catch (error) {
              console.error('Error adding member:', error); // Log error
          }
      });
  }
});
