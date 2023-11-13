import React from 'react'
import '../styles/header.css'
import dark from '../assets/dark.png';
import light from '../assets/light.png';

const Header = ({ theme, setTheme }) => {

  const changeTheme = () => {
   
    let aber= document.getElementById("test");
    //console.log(aber.checked);

    if(aber.checked === true){
    setTheme("nocturnal")
    }
    else{
      setTheme("default")
    }
  }

  return (
    <div className={"header " + theme} >
      <h1>Where in the world?</h1>

      <div id="switch" onClick={changeTheme}>
        <img id="tema" src={theme === "default" ? light : dark} />

        ​<input type="checkbox" id="test" /><label htmlFor="test">Switch theme</label>
      </div>

    </div>
  )
}

export default Header;