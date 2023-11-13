import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import { useParams } from 'react-router-dom';
import back from '../src/assets/left-arrow-svgrepo-com.svg';
import backWhite from '../src/assets/left-arrow-svgrepo-com-white.svg';
import '../src/styles/about.css';
import { useNavigate } from 'react-router-dom';



const About = () => {
  const { countryName } = useParams();
  const [dataCountry, setDataCountry] = useState(null);
  const [bordersC, setBorders] = useState([]);
  const [theme, setTheme] = useState("default");
  
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("CountryName ", countryName);
    

    const countryPage = async () => {
      try {
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        //console.log("response ", response, " data ", data);
        setDataCountry(data);
        if(data[0].borders){
          //console.log("data[0].borders ", data[0].borders)
          
          borderCountrySection(data[0].borders)
        }
       //console.log("dataCountry ", data);
      } catch (error) {
        //console.log('Error fetching countries:', error);
      }
    }

    countryPage();
  }, [countryName]);

  const goBack = () => {
    navigate("/");
  }

const borderCountrySection = async (borders) =>{
  const auxData = []; // Variable temporal para acumular datos
  for (let i = 0; i < borders.length; i++) {
    //console.log("borders ", borders[i])
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${borders[i]}`);
    const data = await response.json();
    //console.log("response pais ", data)
    auxData.push(data);
    
  }
  setBorders([...auxData]);
  //console.log("auxData ", auxData)
  //console.log("bordersC ", bordersC)
  
}

const formatter = (number) => {
//console.log("formatter number ", number)
return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,');
}


  const [container, setContainer] = useState();
  useEffect(() => {
      changeTheme()
     
  }, [theme])


  const changeTheme = () => {

      //console.log(theme);

      if (theme === "default") {

          setContainer("defaultContent")
      }
      else {
          setContainer("nocturnalContent")
      }
  }



  return (
    <>
      <Header theme={theme} setTheme={setTheme}
/>

    <div className={"about " + container}>
      {/* COLUMNA IZQUIERDA*/}
        <div className="banderaGrande">
          <div className={"backback " + theme} onClick={goBack}>
<img id="goBack" src={theme === "default" ? back : backWhite} />
<p> back</p>
</div>
{dataCountry && dataCountry[0].flags.png ? 
<img id="bigFlag" src={dataCountry[0].flags.png}/> : null
}
        </div>

         {/* COLUMNA DERECHA*/}
         <div className="infoPais">
         {dataCountry && dataCountry[0].flags.png ? 
         <>
         <h2>{dataCountry[0]?.name?.common}</h2> 
              <div id="detailedInfo">
                {Object.entries(dataCountry[0]?.name?.nativeName).map(([countryCode, nativeNameData]) => (
                  <p key={countryCode}>
                    <span className="titleInfo">Native Name:</span> {nativeNameData?.official}
                  </p>
                ))}
               <p> <span className="titleInfo">Population:</span> {formatter(dataCountry[0].population)}</p>
               <p> <span className="titleInfo">Region:</span> {dataCountry[0].region}</p>
               <p> <span className="titleInfo">Sub Region:</span> {dataCountry[0].subregion}</p>
               <p> <span className="titleInfo">Capital:</span> {dataCountry[0].capital[0]}</p>
               <p> <span className="titleInfo">Top Level Domain:</span> {dataCountry[0].tld[0]}</p>
               {Object.entries(dataCountry[0]?.currencies).map(([countryCode, nativeNameData]) => (
               <p> <span className="titleInfo">Currencies:</span> {nativeNameData.name}</p>
               ))}
               
               <p> <span className="titleInfo">Languages:</span> {Object.entries(dataCountry[0]?.languages).map(([countryCode, nativeNameData]) => (<span>{nativeNameData}, </span>))}</p>
               
                </div>
                {bordersC.length > 0 ? 
                <div className="theBorders">
                <p id="borderCountry"><span className="titleInfo" >Border Countries:</span>
                {bordersC.map((country, index) => (
    <span className={"borders " + theme} key={index} onClick={() => navigate(`/about/${country[0].name.common}`)}>{country[0].name.common}</span>
  ))}</p></div> : null}
                
          </>

          : null
}
          
        </div>
    </div>
    </>
  )
}

export default About;