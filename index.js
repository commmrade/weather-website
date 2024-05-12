const btn = document.getElementById("btn")
const input = document.getElementById("cityInput")
const weatherStats = document.getElementById("weather-list")

function buildStats(json)
{
    const obj = {
        town: `Поселение: ${json.name}`,
        temperature: `Температура: ${json.main.temp}°`,
        temperatureF: `Температура по ощущениям: ${json.main.feels_like}°`,
        humidity: `Влажность: ${json.main.humidity}%`
    };


    return obj;
}

function isValid(code)
{
    if(code != 200)
    {
        return false;
    }
    return true;
}

function proccessRequest(city, api_key)
{
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    .then((response) => response.json()).then((json) =>
    {
        if(isValid(json.cod))
        {
            weatherStats.style.display = 'block'; //show eleemnts in case they're hidden
            Object.entries(buildStats(json)).forEach(([key, value]) =>
            {
                let newLi = document.createElement("li");
                newLi.innerHTML = value;
                weatherStats.appendChild(newLi);
            });
        }
        else
        {
            input.value = "Такого поселения нет!";
        }
        
    })
}


btn.addEventListener("click", (event) =>
{
    weatherStats.style.display = 'none';
    
    while(weatherStats.firstChild)
    {
        weatherStats.removeChild(weatherStats.firstChild); //remove every child so they won't stack up
    }

    
    let api_key = //Ur api key
    let city = String(input.value).replace(" ", ""); //Replacing whitespaces to avoid issues with city name


    if(city === "") //No point to make an API call in such case
    {
        input.value = "Введите название поселения";
        return;
    }

    proccessRequest(city, api_key);    
})