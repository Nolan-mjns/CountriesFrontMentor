import React, { useState, useEffect } from 'react';
import Country from './Country';
import '../styles/ContentMain.css';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { useNavigate, Link } from 'react-router-dom';


const ContentMain = ({ theme, countries,setCountries, initialState, setInitialState }) => {

const [content, setContent]= useState();
const navigate = useNavigate();


   

useEffect(() => {
    if(countries){
   
    setContent(countries)
    setInitialState(countries)
    
    }
}, [countries])

    const [container, setContainer] = useState();
    useEffect(() => {
        changeTheme()
        //console.log("cococountries ", countries)
       
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

    /*useEffect(() => {
   
        setContent(countries)
        console.log("usecountries ", content);
        if(content){
            let sorted= content.sort();
            setInitialState(sorted)
            console.log("initial en main ", initialState)
        }
        
    }, [])*/

   
    


    return (
        <div className={"principal " + container}>
            
            <div className="filters">
            <SearchBar
            theme={theme}
            setContent={setContent}
            content={content}
            countries={countries}
            setCountries={setCountries}
            initialState={initialState}/>


            <Filter
            theme={theme}
            setContent={setContent}
            content={content}
            countries={countries}
            setCountries={setCountries}
            initialState={initialState}/>
            
    </div>

            <div className="theContent" >
                {content?.map(item =>
                    item.name.common &&
                    
        <Country countries={item} theme={theme} />

                )}
            </div>


        </div>
    )
}

export default ContentMain