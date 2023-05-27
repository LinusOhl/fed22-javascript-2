import React from "react";
// import forecastBanner from "../assets/images/forecast-banner.png";
import day from "../assets/images/day.svg";
import night from "../assets/images/night.svg";
import { ICurrentWeather } from "../types/index";

interface IProps {
  cityWeatherData: ICurrentWeather;
}

const Forecast: React.FC<IProps> = ({ cityWeatherData }) => {
  const now = Math.round(Date.now() / 1000);
  const banner =
    now > cityWeatherData.sys.sunrise && now < cityWeatherData.sys.sunset
      ? day
      : night;

  return (
    <div id="forecast">
      <div className="card">
        <img
          src={banner}
          className="card-img-top"
          alt="Daytime, nighttime, daytime, nighttime"
        />

        <div className="card-body">
          <h5 className="card-title" id="location">
            <span id="city">{cityWeatherData.name}</span>,
            <span id="country">{cityWeatherData.sys.country}</span>
          </h5>
          <p className="temp">
            <span id="temperature">{cityWeatherData.main.temp}</span>
            &deg;C
          </p>
          <p className="humidity">
            <span id="humidity">{cityWeatherData.main.humidity}</span> %
            humidity
          </p>
          <p className="wind">
            <span id="windspeed">{cityWeatherData.wind.speed}</span> m/s
          </p>

          <ul className="conditions">
            {cityWeatherData.weather.map((condition) => (
              <li key={condition.id}>
                <img
                  src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                  title={condition.main}
                  alt={condition.main}
                />
                {condition.description}
              </li>
            ))}
          </ul>

          <p className="text-muted small">
            <span>
              {new Intl.DateTimeFormat("en-gb", {
                dateStyle: "full",
                timeStyle: "medium",
              }).format(new Date(cityWeatherData.dt * 1000))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
