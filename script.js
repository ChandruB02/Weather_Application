const apiKey = "7b05a712af5063ff7745ab7e56ae87b4";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");
      const weatherDiv = document.querySelector(".weather");

      async function checkWeather(city) {
        try {
          const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
          const data = await response.json();

          if (data.cod === "404") {
            alert("City not found!");
            weatherDiv.style.display = "none"; // Hide weather section
            return;
          }

          // Display the weather section on valid data
          weatherDiv.style.display = "block";

          // Update weather data
          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°c";
          document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

          // Update weather icon based on conditions
          const weatherMain = data.weather[0].main;
          if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
          } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
          } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
          } else if (weatherMain === "Snow") {
            weatherIcon.src = "images/snow.png";
          } else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
          } else {
            weatherIcon.src = "images/clear.png"; 
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
          alert("An error occurred while fetching weather data.");
          weatherDiv.style.display = "none"; // Hide on API error
        }
      }

      searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city) {
          checkWeather(city);
        } else {
          alert("Please enter a city name!");
        }
      });
