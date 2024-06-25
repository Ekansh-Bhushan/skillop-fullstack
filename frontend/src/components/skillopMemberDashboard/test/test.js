import React from 'react';
import './test.css';

const Test = () => {
    // get the testId from the URL
    const path = window.location.pathname;
    const testId = path.split('/')[2];

    return (
        <div className='container'>
            <h1>this is test id: {testId}</h1>
            
        </div>
    );
};

export default Test;