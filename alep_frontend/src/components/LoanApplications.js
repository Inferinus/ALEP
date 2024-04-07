import React, { useState, useEffect } from 'react';

function LoanApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await fetch(`/api/user_loan_applications/${userId}`);
        const data = await response.json();
        setApplications(data);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="LoanApplications">
      <h2>Your Loan Applications</h2>
      <ul>
        {applications.map(app => (
          <li key={app.application_id}>
          Loan Amount: {app.loan_amount}, Term: {app.loan_term} months, Status: {app.status}{app.reason ? `, Reason: ${app.reason}` : ''}, Decision Date: {app.decision_date}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanApplications;
