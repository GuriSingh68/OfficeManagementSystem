document.getElementById("memberDetails").addEventListener("click",function() {
    const detailForm=document.getElementById("detailsForm").classList.toggle("hidden")
  });

const addMember=(event) => {
    event.preventDefault();
    alert("Successful submission");
    document.getElementById("detailsForm").classList.toggle("hidden");
} 
document.getElementById("submitDetails").addEventListener("click",addMember());