import React from 'react'
import { Link } from 'react-router-dom';
import './dashboard.css'
function dashboard() {
  return (
    <>
    <div className='dashboard'>
      <h1 className='mb-8'>Dashboard Overview</h1>

      <a href='/dashboard/notes' className=''>
      <div className='notes'>
        <p>Notes</p>
        <h1>Add your Ideas!</h1>
        <p>Take notes of your ideas and thoughts</p>
      </div>
      </a>
    </div>
    </>
  )
}

export default dashboard
