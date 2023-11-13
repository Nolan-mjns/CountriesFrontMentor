

export const allCountries = () =>{
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://restcountries.com/v3.1/all", requestOptions)
    .then(response => JSON.stringify(response))
    .then(result => console.log("aber aqui", result))
    .catch(error => console.log('error', error));
}



