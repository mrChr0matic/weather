const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const conditionOutput=document.querySelector('.condition');
const nameOutput=document.querySelector('.name');
const icon=document.querySelector('icon');
const cloudOutput=document.querySelector('.cloud');
const humidityOutput=document.querySelector('.humidity');
const windOutput=document.querySelector('.wind');
const form=document.getElementById('locationInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');

let cityInput="New Delhi";

cities.forEach((city) => {
    city.addEventListener('click',(e) => {
        cityInput=e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity="1";
    });
})

form.addEventListener("submit",(e) =>{
    if(search.value.length== 0){
        alert("Please enter city");
    }
    else{
        cityInput=search.value;
        fetchWeatherData();
        search.value="";
        app.style.opacity="1";
    }
    e.preventDefault();
});

function dayOfTheWeek(day,month,year){
    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    return weekday[new Date('${day}/${month}/${year}').getDay()];
};

function fetchWeatherData(){
    fetch('https://api.weatherapi.com/v1/current.json?key=ae23e1f2909740308fa194832230401&q='+cityInput)

    .then(response=>response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML=data.current.temp_c +"&#176;"
        conditionOutput.innerHTML=data.current.condition.text;

        const date=data.location.localtime;
        const y=parseInt(date.substr(0,4));
        const m=parseInt(date.substr(5,2));
        const d=parseInt(date.substr(8,2));
        const time=date.substr(11);


        dateOutput.innerHTML= d + '-' + m + '-' + y;  //'${dayOfTheWeek(d,m,y)} ${d}, ${m} ${y}';
        timeOutput.innerHTML=time;

        nameOutput.innerHTML=data.location.name;

        cloudOutput.innerHTML=data.current.cloud +"%";
        humidityOutput.innerHTML=data.current.humidity+"%";
        windOutput.innerHTML=data.current.wind_kph+"km/h";
            
    })
    .catch(()=> {
        alert("City Not Found");
        app.style.opacity="1";
    });
}

fetchWeatherData();
app.style.opacity="1";

