import React from 'react';
import './testConduction.css';
import { v4 as uuidv4 } from 'uuid';

let testId = '';
export default function TestConduction() {
    const generateTestId = () => {
        testId = uuidv4();
        console.log(testId);
        // open a new route with the testId
        // window.open(`/test/${testId}`, '_blank');
    };

    const shareTest = () => {
        // share the test with the user
        window.open(`/test/${testId}`, '_blank');
    }


    return (
        <div className='container'>
            <h1>Create Test</h1>
            <br/>
            <button onClick={generateTestId}>Add a Test</button>
            <br/>
            <p>your test id is: {testId}</p>
            <button onClick={shareTest}>Open Test</button>
        </div>
    );
};