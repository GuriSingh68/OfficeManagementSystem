async function fetchMembers() {
    try {
        const response = await fetch("http://localhost:3000/add-members");
        if (!response.ok) {
            throw new Error(`Failed to load - ${response.statusText}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Failed to fetch members:", error);
    }
}

function displayMembers(members) {
    const memberContainer = document.getElementById("member-container");
    memberContainer.innerHTML = ''; // Clear existing members
    members.forEach(member => {
        const memberElement = `
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 class="text-xl font-semibold text-gray-800">${member.name}</h4>
            <p class="text-gray-600 mt-2">Employee ID: <span class="font-medium">${member.empId}</span></p>
            <p class="text-gray-600 mt-2">Team: <span class="font-medium">${member.team}</span></p>
            <p class="text-gray-600 mt-2">Email: <span class="font-medium">${member.email}</span></p>
            <p class="text-gray-600 mt-2">Manager: <span class="font-medium">${member.manager}</span></p>
            <p class="text-gray-600 mt-2">Role: <span class="font-medium">${member.role}</span></p>
        </div>`;
        memberContainer.innerHTML += memberElement; // Append each member to the container
    });
}

document.addEventListener("DOMContentLoaded", fetchMembers);
