import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import './LoanApplications.css';

function LoanApplications() {
  const [applications, setApplications] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [showReason, setShowReason] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const fetchApplications = async () => {
        const response = await fetch(`/api/user_loan_applications/${userId}`);
        const data = await response.json();
        setApplications(data);
      };
      fetchApplications();
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, applications.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const toggleReason = () => {
    setShowReason(!showReason);
  };

  const renderReasons = (reasonString) => {
    if (!reasonString) return null;
    const reasons = reasonString.split(',').map(reason => reason.trim());
    return (
      <ul>
        {reasons.map((reason, index) => <li key={index}>{reason}</li>)}
      </ul>
    );
  };

  return (
    <div className={`LoanApplications ${showReason ? 'dim' : ''}`}>
      <h2>Your Loan Applications</h2>
      {applications.length > 0 ? (
        <div className="swipe-container">
          <button onClick={handleBack} disabled={activeStep === 0}>&lt;</button>
          <SwipeableViews axis={'x'} index={activeStep} onChangeIndex={setActiveStep}>
            {applications.map((app, index) => (
              <div key={app.application_id} className="application-card">
                <p>Purpose: {app.purpose}</p>
                <p>Application ID: {app.application_id}</p>
                <p>Decision Date: {app.decision_date}</p>
                <p>Loan Amount: {app.loan_amount}</p>
                <p>Term: {app.loan_term} months</p>
                <p>Status: {app.status}</p>
                {app.status === 'Rejected' && (
                  <button className="reason-button" onClick={toggleReason}>Reason</button>
                )}
              </div>
            ))}
          </SwipeableViews>
          <button onClick={handleNext} disabled={activeStep === applications.length - 1}>&gt;</button>
        </div>
      ) : (
        <div>
          <p>No applications on file, go ahead and submit one!</p>
          <button onClick={() => navigate('/apply')} className="apply-now-button">Apply Now</button>
        </div>
      )}
      {showReason && (
        <div className="reason-popup">
          <h4>Reason for Rejection:</h4>
          {applications[activeStep] && renderReasons(applications[activeStep].reason)}
          <button onClick={toggleReason}>Close</button>
        </div>
      )}
    </div>
  );
}

export default LoanApplications;