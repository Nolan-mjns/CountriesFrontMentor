import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import ContentMain from './components/ContentMain';
import { allCountries } from './API endpoints/endpoints';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState("default");

  const[countries, setCountries]= useState()
  const[initialState, setInitialState] = useState()
 

  useEffect(() => {

    const allCountries = async () =>{
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        await fetch("https://restcountries.com/v3.1/all", requestOptions)
        .then((resp) => resp.json())
        .then((resp) => {
  
          let quantity = resp.slice(0,20);
          let paises = quantity.sort()
            setCountries(paises)
            //console.log("setcountries ", countries)
            setInitialState(paises)
            //console.log("inicial ", initialState)
        })
          .catch(error => console.log('error', error));
        }

        allCountries()
        //console.log("countries ", countries)
    
  }, [])
  
  


 
   
  return (
    <div className="Principal">

     <Header
     theme={theme}
     setTheme={setTheme}/>

<ContentMain
theme={theme}
countries={countries}
setCountries={setCountries}
initialState={initialState}
setInitialState={setInitialState}
/>


    </div>

  );
}

export default App;
