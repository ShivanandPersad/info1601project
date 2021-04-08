let database = firebase.database();
M.AutoInit();

function registerUser(name, phone, vehicle, dp, area) {
   firebase.database().ref('drivers/' + vehicle).set({
      name: name,
      phone: phone,
      dp: dp, 
      area: area,
   });
}

let regions = {
   "North": [],
   "South": [],
   "West": [],
   "East": [],
   "Central": [],
   "Tobago": []
}

var getDrivers = firebase.database().ref('drivers/');
getDrivers.on('value', (snapshot) => {
   const data = snapshot.val();
   for(let i in data){
      regions[data[i].area].push(data[i])
   }
});

console.log(regions)


// Tabbed Menu
function openMenu(evt, menuName) {
   var i, x, tablinks;
   x = document.getElementsByClassName("menu");
   for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
   }
   tablinks = document.getElementsByClassName("tablink");
   for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
   }
   document.getElementById(menuName).style.display = "block";
   evt.currentTarget.firstElementChild.className += " w3-red";
}
document.getElementById("myLink").click();

document.getElementById('registerBtn').addEventListener('click', (event)=>{
   event.preventDefault()
   let name = document.getElementById('name').value
   let phone = document.getElementById('phone').value
   let vehicle = document.getElementById('vehicle').value
   let dp = document.getElementById('dp').value
   let area = document.getElementById('area').value
   console.log(name,phone,vehicle,dp,area)
   registerUser(name, phone, vehicle, dp, area)
})