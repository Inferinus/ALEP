import React from 'react';
import { Link } from 'react-router-dom';


function Dashboard() {
  return (
    <div className="Dashboard">

      <h2>Welcome to Your Dashboard</h2>
      <Link to="/apply" className='button'>Apply for a New Loan</Link>
      <span className='button-space'></span>
      <Link to="/loan-applications" className='button'>View Your Loan Applications</Link>
    </div>
  );
}

export default Dashboard;