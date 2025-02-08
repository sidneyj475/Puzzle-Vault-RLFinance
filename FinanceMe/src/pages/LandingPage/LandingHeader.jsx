import React from "react";
import "./LandingHeader.css"; 
import Avatar from '../../components/Avatar.jsx';
import coin from '../../assets/coin1.svg';
import Button from '../../components/button.jsx';

function Header() {


  return (
    <header className='header'>
      <div className = 'profile-container'>
        <div className='avatar-container' >
          <Avatar alt="profile-image" image={coin}/>
        </div>
        <p className='name'>Carson Bates</p>
      </div>
      <Button className="landing-page__sign-out-button">Sign Out</Button>
    </header>
  );
}

export default Header;
