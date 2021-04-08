let database = firebase.database();

async function registerUser(name, phone, vehicle, dp, area) {
   await firebase.database().ref('drivers/' + vehicle).set({
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
      let x = data[i]
      x.vehicle = i.slice(0,3) + " " + i.slice(3)
      regions[data[i].area].push(x)
   }
});

console.log(regions)
function areaSelect(){
   let area = document.getElementById('landingSelector').value
   let areaName = (area == 'North' || area == 'West' || area == 'East')? "the "+ area : area
   let temp = `
      <h4>Drivers in ${areaName}</h4>
         <div id="driverList"></div>
      </div>
   `
   document.getElementById('results').innerHTML = temp
   temp = ''
   for(let i of regions[area]){
      console.log(i.area)
      temp+=`
         <div class="driverListItem">
            <img class='listItemVerifiedBadge' src="./pictures/protection.png" alt="">
            <div class="listItemInner">
               <b>${i.name}</b>
               <b>Vehicle License: ${i.vehicle}</b>
            </div>
         </div>
      `
   }
   document.getElementById('driverList').innerHTML = temp
}

document.getElementById('registerBtn').addEventListener('click', (event)=>{
   event.preventDefault()
   let name = document.getElementById('name')
   let phone = document.getElementById('phone')
   let vehicle = document.getElementById('vehicle')
   let dp = document.getElementById('dp')
   let area = document.getElementById('area')
   registerUser(name.value, phone.value, vehicle.value, dp.value, area.value)
   name.value = ''
   phone.value = ''
   vehicle.value = ''
   dp.value = ''
   area.value = ''
})



// // Tabbed Menu
// function openMenu(evt, menuName) {
//    var i, x, tablinks;
//    x = document.getElementsByClassName("menu");
//    for (i = 0; i < x.length; i++) {
//       x[i].style.display = "none";
//    }
//    tablinks = document.getElementsByClassName("tablink");
//    for (i = 0; i < x.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
//    }
//    document.getElementById(menuName).style.display = "block";
//    evt.currentTarget.firstElementChild.className += " w3-red";
// }
// document.getElementById("myLink").click();