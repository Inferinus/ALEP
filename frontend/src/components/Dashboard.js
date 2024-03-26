import React, { useEffect, useState } from 'react';
import { getEligibilityResults } from '../services/loanService';

function Dashboard() {
//  const [eligibilityResult, setEligibilityResult] = useState(null);

//  useEffect(() => {
//    fetchEligibilityResults();
//  }, []);

//  const fetchEligibilityResults = async () => {
//    const results = await getEligibilityResults();
//    setEligibilityResult(results);
//  };

//  return (
//    <div>
//      {eligibilityResult ? (
//        <>
//          <h2>Loan Eligibility Results</h2>
//          <p>Your financial health looks <strong>{eligibilityResult.financialHealth}</strong>.</p>
//          <p>Loan Eligibility Status: <strong>{eligibilityResult.status}</strong></p>
//          <p>Tips for Improvement:</p>
//          <ul>
//            {eligibilityResult.tips.map((tip, index) => (
//              <li key={index}>{tip}</li>
//            ))}
//          </ul>
//     ) : (
//       <p>Loading your results...</p>
//      )}
//    </div>
//  );

console.log('Hello, world!');
return (
  <div>
    <h2>Dashboard</h2>
    <p>Hello, world!</p>
  </div>
);
}

export default Dashboard;
