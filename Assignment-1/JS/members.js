document.getElementById("memberDetails").addEventListener("click",function(event) {
    event.preventDefault();
    const detailForm=document.getElementById("detailsForm").classList.toggle("hidden")
  });

const addMember=(e) => {
    e.preventDefault();
    alert("Successful submission");
    document.getElementById("detailsForm").classList.toggle("hidden");
} 
document.getElementById("submitDetails").addEventListener("click",addMember());