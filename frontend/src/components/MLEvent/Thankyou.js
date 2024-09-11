import React from 'react';

const ThankYou = () => {
  // Inline CSS styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    textAlign: 'center',
    marginLeft:'56vh',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    color: '#4caf50',
    fontSize: '2.5rem',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Thank You!</h1>
      <p style={paragraphStyle}>Your submission has been received. We appreciate your response.</p>
      
    </div>
  );
};

export default ThankYou;
