import React from 'react'
import '../styles/Filters.css';

const Filter = ({theme,setCountries, initialState, countries}) => {

  const searchingByRegion = async (name) =>{
    //console.log("que llega ", name)
   
         var requestOptions = {
             method: 'GET',
             redirect: 'follow'
           };
           if (name != "" || name != "todos"){

          
           await fetch("https://restcountries.com/v3.1/region/"+name, requestOptions)
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
           .catch((error) => {
            defaultCountries()
          });
           }
else{

  defaultCountries()
}
  }
         
const defaultCountries = async() =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
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


  return (

    <div className={"filtro " + theme}>
    <select name="regions" className={"regions"} onChange={(e) => searchingByRegion(e.target.value)}>
    <option value="todos">Todas las regiones</option>
      <option value="africa">Africa</option>
      <option value="america">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
    </div>
  )
}

export default Filter