import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/button';
import './header.css';

const Header = ({ onQuit, onHint }) => {
  return (
    <header className="header">
      <Button className="header-quit" onClick={onQuit}>
        {/* You could replace this with an actual icon or SVG if you prefer */}
        <span style={{ marginRight: '6px' }}>&larr;</span>
        Quit
      </Button>

      <Button className="header-hint" onClick={onHint}>
        Hint?
      </Button>
    </header>
  );
};

Header.propTypes = {
  onQuit: PropTypes.func,
  onHint: PropTypes.func,
};

export default Header;
