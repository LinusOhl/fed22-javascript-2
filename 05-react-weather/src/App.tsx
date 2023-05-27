import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/owmapi";
import { ICurrentWeather } from "./types";
import Airplane from "./assets/images/747.svg";
import "./assets/scss/App.scss";

function App() {
  const [weather, setWeather] = useState<ICurrentWeather>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (city: string) => {
    setWeather(undefined);
    setError("");
    setLoading(true);

    try {
      const data = await getCurrentWeather(city);

      setWeather(data);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div id="app" className="container">
      <SearchCity onGetWeather={getWeather} />

      {loading && <img src={Airplane} className="img-fluid py-5 w-100"></img>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {weather && <Forecast cityWeatherData={weather} />}
    </div>
  );
}

export default App;
