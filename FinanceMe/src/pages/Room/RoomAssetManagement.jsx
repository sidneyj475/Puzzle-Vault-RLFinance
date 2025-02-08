import React from 'react';

function BackgroundPage() {
  const pageStyle = {
    // If you want the background to cover the entire window:
    width: '100vw',
    height: '100vh',
    
    // Background Image styling
    background: `url('/Users/zachariahrisheq/RLFinance-1/FinanceMe/src/assets/AdobeStock_701512458.jpeg') no-repeat center center/cover`,
  };

  return (
    <div style={pageStyle}>
      {/* 
        You can place any content here if needed, 
        or leave it empty for a full background image. 
      */}
    </div>
  );
}

export default BackgroundPage;
