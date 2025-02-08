import React from "react";
import "./LandingHeader.css"; 
function Header() {


  return (
    <header class='header'>
      <div class = 'profile-container'>
        <div class='avatar' />
        <span class='name'>Username</span>
      </div>
      <button class='sign-out-button'>Sign Out</button>
    </header>
  );
}

export default Header;
