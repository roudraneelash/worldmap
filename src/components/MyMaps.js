import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import countries from "../data/countries.json";
import CountryCard from "./CountryCard";
import "leaflet/dist/leaflet.css";

const Mymap = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");

  const [countryDetails, setCountryDetails] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const countryStyle = {
    color: "blue",
    fillColor: "lightblue",
    fillOpacity: 1,
    weight: 2,
  };

  useEffect(() => {
    if (selectedCountry) {
      selectedCountry.toLocaleLowerCase();
      if (selectedCountry.toLocaleLowerCase() === "india")
        fetchData("Republic of India");
      else fetchData(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchData = async (country) => {
    try {
      setIsLoading(true); // Set loading to true before fetching
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const [countryData] = await response.json();

      setCountryDetails(countryData);
    } catch (error) {
      console.error("Error fetching country details:", error);
      setCountryDetails(null); // Clear country details on error
    } finally {
      setIsLoading(false); // Set loading to false after fetching, whether successful or not
    }
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;

    layer.on({
      click: (e) => {
        // avoid unnecessary re-fetching of data
        if (countryName.toLowerCase() !== selectedCountry.toLowerCase()) {
          setSelectedCountry(countryName);
        }
      },
    });
    layer.bindPopup(countryName);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the submitted data (you can send it to an API, update state, etc.)
    setSelectedCountry(searchTerm);
  };

  return (
    <div className="container">
      <div className="map-container">
        <h1>My Map</h1>
        <MapContainer zoom={1} center={[20, 100]} className="map">
          <GeoJSON
            style={countryStyle}
            data={countries.features}
            onEachFeature={onEachCountry}
          />
        </MapContainer>
      </div>
      <div className="display-details">
        <h2>Search</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search country..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button className="submit">Search</button>
        </form>
        <div className="result-container">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : countryDetails ? (
            <CountryCard
              flagUrl={countryDetails.flags.png}
              countryName={countryDetails.name?.common}
              capital={countryDetails.capital}
              continents={countryDetails.continents}
              languages={
                countryDetails.languages
                  ? Object.values(countryDetails.languages)
                  : []
              }
              population={countryDetails.population}
            />
          ) : (
            selectedCountry.length !== 0 && <h2>Not Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mymap;
