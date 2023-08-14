import React from "react";

const CountryCard = ({
  flagUrl,
  countryName,
  capital,
  population,
  continents,
  languages,
}) => {
  if (languages.length > 3) {
    languages = languages.slice(0, 3);
  }
  return (
    <div className="card">
      <div className="flag">
        <img src={flagUrl} alt={`Flag of ${countryName}`} />
      </div>
      <div>
        <h2>{countryName}</h2>
        <div className="details">
          <p>Capital: {capital}</p>
          <p>Continents: {continents}</p>
          <p>Languages:{languages.join(", ")}</p>
          <p>Population:{population}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
