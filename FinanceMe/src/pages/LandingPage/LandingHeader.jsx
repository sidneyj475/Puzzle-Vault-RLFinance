// LandingHeader.jsx
import React, { useContext } from "react";
import "./LandingHeader.css"; 
import Avatar from '../../components/Avatar.jsx';
import coin from '../../assets/coins/coin1.svg';
import Button from '../../components/button.jsx';
import FileUpload from '../../components/FileUpload.jsx';
import { AuthContext } from "../../AuthContext.jsx";

function LandingHeader({ isProcessing, onQuizzify }) {
  const { logout } = useContext(AuthContext);

  return (
    <header className='landing-header'>
      {/* Left side: Profile/avatar */}
      <div className='profile-container'>
        <div className='avatar-container'>
          <Avatar alt="profile-image" image={coin} />
        </div>
        <p className='name'>Carson Bates</p>
      </div>

      {/* Right side: Buttons go here */}
      <div 
        className="landing-header__buttons"
        style={{ display: 'flex', gap: "25px", justifyContent: 'center', alignItems: 'center' }}
      >
        {/* FileUpload triggers its own logic; rename if you want it to say “New File” */}
        <FileUpload />

        {/* Quizzify button */}
        <Button onClick={onQuizzify} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Quizzify"}
        </Button>

        {/* Sign Out button */}
        <Button onClick={logout} className="landing-header__sign-out-button">
          Sign Out
        </Button>
      </div>
    </header>
  );
}

export default LandingHeader;
