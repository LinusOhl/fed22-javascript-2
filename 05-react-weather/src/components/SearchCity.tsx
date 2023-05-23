import React, { useEffect, useState } from "react";

interface IProps {
  onGetWeather: (city: string) => void;
}

const SearchCity: React.FC<IProps> = ({ onGetWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (city.length < 3 || !city) {
      return;
    }

    onGetWeather(city);

    setCity("");
  };

  return (
    <div id="search-wrapper">
      <form id="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city to search for"
            aria-label="City"
            aria-details="Search for city to show current weather for."
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />

          <button
            type="submit"
            className="btn btn-success"
            disabled={city.trim().length < 3}
          >
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchCity;
