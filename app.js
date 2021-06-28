window.addEventListener('load',()=> {
    // variable declaration for longitude and latitude
    let long;
    let lat;

    // docm manipulation selector
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    // verified if the browser support this future and if yes task to complete
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.altitude;
            
            //using a random api. it may not work but just to show how that works
            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
            .then(data =>{
                return data.json();
            })
            .then(data =>{
                const{temperature, summary,icon}= data.currently;
                //set dom element from the api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent =data.timeZone;
                //formula to convert degree in celsius
                let celsius = (temperature - 32)*(5/9);

                //set icons
                setIcons(icon,document.querySelector(".icon"));

                //chance temperature
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan==='F'){
                        temperatureSpan.textContent ="C";
                        temperatureDegree.textContent =Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent ="F";
                        temperature.textContent =temperature;
                    }
                });
            });
        });
        
    }
    function setIcons(icon,iconId){
        const skycons = new skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, skycons[currentIcon]);
    }
});