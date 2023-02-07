import { useState, useEffect } from "react";
import axios from "axios";

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((resp) => {
        setWeather(resp.data);
      });
  }, []);

  if (!weather) return <div></div>;

  return (
    <>
      {" "}
      <h2>{`Weather in ${country.capital[0]}`}</h2>
      <p>{`Temperature ${weather.main.temp} ºF`}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon"
      ></img>
      <p>{`Wind ${weather.wind.speed} m/s`}</p>
    </>
  );
};

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.official}</h1>
      <p>{`capital ${country.capital[0]}`}</p>
      <p>{`area ${country.area}`}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <WeatherData country={country} />
    </>
  );
};

export default Country;
