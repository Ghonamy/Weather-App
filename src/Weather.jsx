import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Search_Icon from "./Assets/search.png";
import Clear_Icon from "./Assets/clear.png";
import Cloud_Icon from "./Assets/cloud.png";
import Drizzle_Icon from "./Assets/drizzle.png";
import Humidity_Icon from "./Assets/humidity.png";
import Rain_Icon from "./Assets/rain.png";
import Snow_Icon from "./Assets/snow.png";
import Wind_Icon from "./Assets/wind.png";

function Weather() {
  const inputRef = useRef();
  const [WeatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": Clear_Icon,
    "01n": Clear_Icon,
    "02d": Cloud_Icon,
    "02n": Cloud_Icon,
    "03d": Cloud_Icon,
    "03n": Cloud_Icon,
    "04d": Drizzle_Icon,
    "04n": Drizzle_Icon,
    "09d": Rain_Icon,
    "09n": Rain_Icon,
    "10d": Rain_Icon,
    "10n": Rain_Icon,
    "13d": Snow_Icon,
    "13n": Snow_Icon,
  };
  const search = async (city) => {
    if (!city) {
      Swal.fire({
        title: "Please Enter City Name 🤡",
        text: "",
        icon: "warning",
      });
      return;
    }
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.cod === "404") {
        Swal.fire({
          title: "City Not Found 🤡",
          text: "Please Enter a Valid City Name.",
          icon: "error",
        });
        return;
      }

      console.log(data);
      const Icon = allIcons[data.weather[0].icon] || Clear_Icon;
      setWeatherData({
        location: data.name,
        humidity: data.main.humidity,
        temprature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        icon: Icon,
      });
    } catch (error) {
      setWeatherData(false);
    }
  };
  useEffect(() => {
    search("Cairo");
  }, []);
  return (
    <div className="bg-[#d7c3ff] min-h-screen p-[10px]">
      <div className="bg-gradient-to-r from-[#2f4680] to-[#5320c2] w-[400px] mx-auto mt-[100px] rounded-2xl px-5 py-8 text-[#fff] shadow-[0_0_10px_#2f4680]">
        <div className="flex items-center w-full">
          <input
            ref={inputRef}
            className="border-0 outline-0 rounded-full mr-3 bg-[#fff] px-4 py-2 w-full text-[20px] text-[#5320c2] font-medium"
            type="text"
            placeholder="Search"
            onKeyDown={(e) => e.key === "Enter" && search(inputRef.current.value)}
          />
          <img
            onClick={() => search(inputRef.current.value)}
            src={Search_Icon}
            alt="Search"
            className="bg-[#fff] rounded-full p-2.5 w-[40px]"
          />
        </div>
        {WeatherData ? (
          <>
            <div className="flex flex-col justify-center items-center my-5">
              <img
                src={WeatherData.icon}
                alt="Clear"
                className="max-w-[180px]"
              />
              <h1 className="text-[60px]">{WeatherData.temprature}°c</h1>
              <p className="text-[40px] mb-4">{WeatherData.location}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={Humidity_Icon} alt="Humidity" className="mr-2" />
                <div className="flex flex-col text-[19px] font-medium">
                  <p>{WeatherData.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={Wind_Icon} alt="Wind" className="mr-2" />
                <div className="flex flex-col text-[19px] font-medium">
                  <p>{WeatherData.windSpeed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Weather;
