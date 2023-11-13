import React, {useEffect, useState} from 'react';
import dark from '../assets/lupa.png';
import light from '../assets/lupaBlanca.png';
import '../styles/Filters.css';

const SearchBar = ({theme, setCountries, initialState, countries}) => {

    const [searchValue, setSearchValue] = useState("")


    const searchingByName = async (name) =>{
       //console.log("que llega ", name)
       //console.log("inicial ", initialState)
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              if (name != ""){

             
              await fetch("https://restcountries.com/v3.1/name/"+name, requestOptions)
              .then((resp) => resp.json())
              .then((resp) => {
        
                let quantity = resp.slice(0,20);
                if(quantity.value != ""){
                    setCountries(quantity)
                    //console.log("quantity lenght ", quantity.length)
                }else{
                    setCountries(countries)
                }
                  
              })
              .catch(error => setCountries(countries));
            
              }
else{
  await fetch("https://restcountries.com/v3.1/all", requestOptions)
              .then((resp) => resp.json())
              .then((resp) => {
        
                let quantity = resp.slice(0,20);
                if(quantity.value != ""){
                    setCountries(quantity)
                    //console.log("quantity lenght ", quantity.length)
                }else{
                    setCountries(countries)
                }
                  
              })
              .catch(error => setCountries(countries));
            
              }
}
            
      
          

    
    
  return (
    <div className={"search " + theme}>
<img src={theme === "default" ? dark : light}/>
<input id="searching" type="text" placeholder="Search for a country..." onChange={(e) => searchingByName(e.target.value)}/>
    </div>
  )
}

export default SearchBar