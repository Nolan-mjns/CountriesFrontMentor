import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import ContentMain from './components/ContentMain';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import About from "./About";

function App() {
  
  const [countries, setCountries] = useState([]);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        //const quantity = data.slice(0, 20);
        //const sortedCountries = quantity.sort();

        setCountries(data);
        setInitialState(data);
      } catch (error) {
        console.log('Error fetching countries:', error);
      }
    }

    fetchAllCountries();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home countries={countries} setCountries={setCountries} initialState={initialState} setInitialState={setInitialState} />} />
        <Route path="/about/:countryName" element={<About />} />
      </Routes>
    </Router>
  );
}

function Home({ countries, setCountries, initialState, setInitialState }) {
  const [theme, setTheme] = useState("default");
  const navigate = useNavigate();

  const verMas = () => {
    navigate('/about');
  };

  return (
    <div className="Principal">
      <Header theme={theme} setTheme={setTheme} />
      <ContentMain
         theme={theme}
        countries={countries}
        setCountries={setCountries}
        initialState={initialState}
        setInitialState={setInitialState}
        verMas={verMas}

      />
      
    </div>
  );
}

export default App;
