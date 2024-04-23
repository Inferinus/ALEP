import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoanApprovalGraphs from './LoanApprovalGraphs';
import './Dashboard.css';

function Dashboard() {
  const [latestApplication, setLatestApplication] = useState(null);
  const [userName, setUserName] = useState('');
  const [showReason, setShowReason] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const fetchUserData = async () => {
        const response = await fetch(`/api/retrieve_user/${userId}`);
        const userData = await response.json();
        setUserName(userData.firstname);
      };
      fetchUserData();

      const fetchLatestApplication = async () => {
        const response = await fetch(`/api/latest_loan_application/${userId}`);
        const appData = await response.json();
        if (!appData.error) {
          setLatestApplication(appData);
        } else {
          setLatestApplication(null);  // Ensure null is set if no application is found
        }
      };
      fetchLatestApplication();
    }
  }, []);

  const toggleReason = () => {
    setShowReason(!showReason);
  };

  return (
    <div className="Dashboard">
      <h2>Welcome to Your ALEP Dashboard, {userName}!</h2>
      <div className="dashboard-grid">
        <div className="left-column">
          {latestApplication ? (
            <div className="latest-application">
              <h3>Latest Application:</h3>
              <p>Application ID: {latestApplication.application_id}</p>
              <p>Loan Amount: {latestApplication.loan_amount}</p>
              <p>Status: {latestApplication.status}</p>
              <p>Decision Date: {latestApplication.decision_date}</p>
              {latestApplication.status === "Rejected" && (
                <button onClick={toggleReason}>Reason</button>
              )}
              {showReason && (
                <div className="reason-popup">
                  <p>Reason: {latestApplication.reason}</p>
                  <button onClick={toggleReason}>Close</button>
                </div>
              )}
            </div>
          ) : (
            <div className="no-application">
              <h3>No applications on file, go ahead and submit one!</h3>
            </div>
          )}
          <div className="application-links">
            <Link to="/apply" className='button'>Apply for a New Loan</Link>
            <span className='button-space'></span>
            <Link to="/loan-applications" className='button'>View Your Loan Applications</Link>
          </div>
        </div>
        <div className="right-column">
          <h2>Factors that may affect Approval</h2>
          <LoanApprovalGraphs />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
