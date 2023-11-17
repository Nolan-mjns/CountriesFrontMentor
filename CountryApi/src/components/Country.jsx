import React, { useState, useEffect } from 'react';
import '../styles/CountryCard.css';
import { useNavigate } from 'react-router-dom';

const Country = ({countries, theme}) => {

  const navigate = useNavigate();
    //console.log(countries)
    const verMas = () => {
      navigate(`/about/${countries.cca2}`);
    };

    const formatter = (number) => {
      //console.log("formatter number ", number)
      return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,');
      }
    
  return (
    <div className={"countryCard " + theme} onClick={verMas}>
       <img className="fotos" src={countries.flags.png}/>

       <div className="featInfo">
       <h2>{countries.name.common && countries.name.common}</h2>
       <p><span className="sections">Population: </span>{formatter(countries.population)}</p>
       <p><span className="sections">Region: </span>{countries.region}</p>
       {countries.capital ? 
       <p><span className="sections">Capital: </span>{countries.capital && countries.capital[0]}</p> : null}
       
       </div>
    </div>
  )
}

export default Country