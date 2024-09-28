document.getElementById("memberDetails").addEventListener("click",function(event) {
  event.preventDefault();
    const detailForm=document.getElementById("detailsForm").classList.toggle("hidden")
  });

const addMember=(event) => {
    event.preventDefault();
    document.getElementById("detailsForm").classList.toggle("hidden");
    alert("Successful submission");
} 
document.getElementById("submitDetails").addEventListener("click",addMember);