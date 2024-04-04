import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="Dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <p>Here you can apply for a new loan, view your loan applications, and more.</p>
      <Link to="/apply">Apply for a New Loan</Link>
      <Link to="/loan-applications">View Your Loan Applications</Link>
    </div>
  );
}

export default Dashboard;
