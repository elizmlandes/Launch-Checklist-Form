
window.addEventListener("load", function() {

       let form = document.querySelector("form");
       let fuel = document.getElementById("fuelStatus");
       let cargo = document.getElementById("cargoStatus");
       let pilotStatus = document.getElementById("pilotStatus");
       let copilotStatus = document.getElementById("copilotStatus");
       let faultyItems = document.getElementById("faultyItems");
       faultyItems.style.visibility = "hidden";
       
   

       fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
           response.json().then(function(json)
         {
           const div = document.getElementById("missionTarget");
            let index = Math.ceil(Math.random()*json.length);
            let data = json[index];
           
            div.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                   <li>Name: ${data.name}</li>
                   <li>Diameter: ${data.diameter}</li>
                   <li>Star: ${data.star}</li>
                   <li>Distance from Earth: ${data.distance}</li>
                   <li>Number of Moons: ${data.moons}</li>
               </ol>
               <img src="${data.image}">
               `;
           });
       });
   
   
       form.addEventListener("submit", function(event)
           {
           event.preventDefault();

           let pilotInput = document.querySelector("input[name=pilotName]");
           let pilot = pilotInput.value;
           let pilotTest = String(pilot);
   
           let copilotInput = document.querySelector("input[name=copilotName]");
           let copilot = copilotInput.value;
           let copilotTest = String(copilot);
   
           let fuelInput = document.querySelector("input[name=fuelLevel]");
           let fuelLevel = Number(fuelInput.value);
   
           let cargoInput = document.querySelector("input[name=cargoMass]");
           let cargoLevel = Number(cargoInput.value);
   
           if (pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoInput.value === "") {
               alert("All fields required.");
   
           } else if (isNaN(pilotTest) === false || isNaN(copilotTest) === false) {
               alert("Please enter valid information for each field.");

           } else {
               let launchStatus = document.getElementById("launchStatus");
               faultyItems.style.visibility = "visible";
               pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
               copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
          

               if (fuelLevel < 10000 && cargoLevel < 10000) {
                   launchStatus.style.color = "red";
                   fuel.innerHTML = "Fuel too low for launch";
                   cargo.innerHTML = "Cargo mass okay for launch"
                   launchStatus.innerHTML = "Shuttle Not Ready For Launch";

               } else if (fuelLevel > 10000 && cargoLevel > 10000) {
                   launchStatus.style.color = "red";
                   fuel.innerHTML = "Fueled up, ready for launch."
                   cargo.innerHTML = "Cargo too heavy for launch";
                   launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                   

               } else if (fuelLevel < 10000 && cargoLevel > 10000) {
                   launchStatus.style.color = "red";
                   fuel.innerHTML = "Fuel too low for launch";
                   cargo.innerHTML = "Cargo too heavy for launch";
                   launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                  

               } else {
                   launchStatus.style.color = "green";
                   fuel.innerHTML = "Fueled up, ready for launch"
                   cargo.innerHTML = "Cargo mass okay for launch"
                   launchStatus.innerHTML = "Shuttle is Ready for Launch";
                   
               }
           }
       });
   });