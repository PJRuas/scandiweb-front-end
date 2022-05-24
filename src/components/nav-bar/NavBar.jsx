import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const NavBar = (props) => {

  const buttons = {'firstButton': props.firstButton, 'secondButton' : props.secondButton} 

  function handleButtonContent(buttonParams){
    if(buttonParams.route){
      return (
        <Link className='a-route' to={buttonParams.route}>{buttonParams.text}</Link>
      )
      } else {
      return buttonParams.text
    }
  }

  return (
    <nav>
      <div className="navbar">
        <button id={buttons.firstButton.id} className={buttons.firstButton.class} onClick={buttons.firstButton.function} disabled={buttons.firstButton.buttonStatus}>{handleButtonContent(buttons.firstButton)}</button>
        <button id={buttons.secondButton.id} className={buttons.secondButton.class} onClick={buttons.secondButton.function} disabled={buttons.secondButton.buttonStatus}>{handleButtonContent(buttons.secondButton)}</button>
      </div>
    </nav>
  )
}

export default NavBar