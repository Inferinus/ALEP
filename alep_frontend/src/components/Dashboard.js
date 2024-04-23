// Path: alep_frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoanApprovalGraphs from './LoanApprovalGraphs';

function Dashboard() {
  const [latestApplication, setLatestApplication] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserNameAndLatestApplication = async () => {
      // Assuming the user ID is stored in localStorage
      const userId = localStorage.getItem('userId');

      // Fetch user's first name
      if (userId) {
        const userResponse = await fetch(`/api/retrieve_user/${userId}`);
        const userData = await userResponse.json();
        setUserName(userData.firstname);  // Assuming the user's first name is returned as 'firstname'

        // Fetch the latest application
        const response = await fetch(`/api/latest_loan_application/${userId}`);
        const latestAppData = await response.json();
        if (!latestAppData.error) {
          setLatestApplication(latestAppData);
        } else {
          setLatestApplication(null);
        }
      }
    };

    fetchUserNameAndLatestApplication();
  }, []);

  return (
    <div className="Dashboard">
      <h2>Welcome to Your ALEP Dashboard, {userName}!</h2>
      {latestApplication ? (
        <div>
          <h3>Latest Application:</h3>
          <p>Application ID: {latestApplication.application_id}</p>
          <p>Loan Amount: {latestApplication.loan_amount}</p>
          <p>Status: {latestApplication.status}</p>
          <p>Decision Date: {latestApplication.decision_date}</p>
        </div>
      ) : (
        <div>
          <h3>No applications on file, go apply!</h3>
        </div>
      )}
      <Link to="/apply" className='button'>Apply for a new loan</Link>
      <span className='button-space'></span>
      <Link to="/loan-applications" className='button'>View all your loan applications</Link>
      <LoanApprovalGraphs />
    </div>
  );
}

export default Dashboard;
