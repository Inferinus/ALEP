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
          setLatestApplication(null);
        }
      };
      fetchLatestApplication();
    }
  }, []);

  const toggleReason = () => {
    setShowReason(!showReason);
  };

  return (
    <div className={`Dashboard ${showReason ? 'dim' : ''}`}>
      <h2>Welcome to Your ALEP Dashboard, {userName}!</h2>
      <div className="dashboard-grid">
        <div className="left-column">
          {latestApplication ? (
            <div className="latest-application">
            <h3>Latest Application</h3>
            <p>{latestApplication.purpose}</p>
            <p className="application-id">#{latestApplication.application_id} • {latestApplication.decision_date}</p>
            <p className="application-amount">${latestApplication.loan_amount}</p>
            <div className={`status ${latestApplication.status === 'Approved' ? 'status-approved' : 'status-rejected'}`}>
              {latestApplication.status}
            </div>
            {latestApplication.status === "Rejected" && (
              <button className="reason-button" onClick={toggleReason}>Reason</button>
            )}
              {showReason && (
                <div className="reason-popup">
                  <h4>Reason for Rejection:</h4>
                  <ul>
                    {latestApplication.reason.split(',').map((reason, index) => <li key={index}>{reason}</li>)}
                  </ul>
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
          <div className="credit-tips">
            <h3>Tips to Improve Credit:</h3>
            <ul>
              <li>✓ Pay your bills on time</li>
              <li>✓ Keep your balances low</li>
              <li>✓ Don’t close old accounts</li>
              <li>✓ Have a mix of loans</li>
            </ul>
          </div>
        </div>
        <div className="right-column">
          <LoanApprovalGraphs />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
