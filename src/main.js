import "./style.css";
import  initialRepairs from "./data.js";

// console.log(initialRepairs);

function getRepair(repairs , id ) {

 const chosenRepair = repairs.find( r => r.id === id);


 return chosenRepair ;

}
 const repair = getRepair(initialRepairs, "R2f");
 if(repair) {

console.log(repair.device);
 }
 else 
 {
    console.log("repairs not found");
 }


function renderRepair(repairs) {
    const repairList = document.getElementById("repairList");
    const counter = document.getElementById("repairCount");
    repairList.innerHTML = "";
 repairs.forEach((repair) => {

    const li = document.createElement("li");
    const renderDevice = document.createElement("span");
    renderDevice.textContent = `${repair.device}`  ; 
  li.appendChild(renderDevice); 
     
    const renderId = document.createElement("span");
  renderId.textContent = `${repair.id}`  ;
    li.appendChild(renderId);


      const renderStatus = document.createElement("span");
  renderStatus.textContent = `${repair.status}`  ;
    li.appendChild(renderStatus);
    li.className = "repair-item";
    repairList.appendChild(li);


   
 })
counter.textContent = repairs.length;
 if(repairs.length) {
    const hiddenDm = document.getElementById("emptyMessage") ;
    
    hiddenDm.textContent = "" ;
    
 }

}

 renderRepair(initialRepairs);


 function filterRepair(repairs , status){
   
  if (status === "tous"){
        return repairs ;
     }
     else {
        const filterdRepair = repairs.filter(repair => 
        repair.status === status
         );
     

    return filterdRepair;
     }
       
 }
console.log(filterRepair(initialRepairs, "en_cours"));
  




let currentRepairs = [...initialRepairs];
let nextRepairId = 5;
function addRepair(repairs, newRepair) {
    const updatedRepairs = [...repairs, newRepair];
    return updatedRepairs;
}


const FilterStatus = document.getElementById("statusFilter");

FilterStatus.addEventListener("change", () => {
    const result = filterRepair(currentRepairs, FilterStatus.value);
    renderRepair(result);
});


const form = document.getElementById("repairForm");
const input = document.getElementById("deviceInput");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const deviceName = input.value.trim();

    if (deviceName === "") {
        alert("Please enter a device name");
        return;
    }

    const newRepair = {
        id: `R${nextRepairId}`,
        device: deviceName,
        status: "recu"
    };
        nextRepairId++;
    currentRepairs = addRepair(currentRepairs, newRepair);

    const result = filterRepair(currentRepairs, FilterStatus.value);

    renderRepair(result);

    input.value = "";
});


renderRepair(currentRepairs);
