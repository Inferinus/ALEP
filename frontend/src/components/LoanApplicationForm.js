import React, { useState } from 'react';
import { submitApplication } from '../services/loanService'; // Ensure this service is implemented

function LoanApplicationForm() {
  const [loanApplication, setLoanApplication] = useState({
    gender: '',
    married: '',
    dependents: '',
    education: '',
    selfEmployed: '',
    applicantIncome: '',
    coapplicantIncome: '',
    loanAmount: '',
    loanTerm: '',
    creditHistory: '',
    propertyArea: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication(loanApplication);
      alert('Application submitted successfully!');
      // Optionally reset form or navigate the user to a confirmation page
    } catch (error) {
      alert('An error occurred while submitting the application.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanApplication(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Gender:</label>
        <select name="gender" value={loanApplication.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Married:</label>
        <select name="married" value={loanApplication.married} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>Dependents:</label>
        <input type="number" name="dependents" value={loanApplication.dependents} onChange={handleChange} />
      </div>
      <div>
        <label>Education:</label>
        <select name="education" value={loanApplication.education} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Graduate">Graduate</option>
          <option value="Not Graduate">Not Graduate</option>
        </select>
      </div>
      <div>
        <label>Self Employed:</label>
        <select name="selfEmployed" value={loanApplication.selfEmployed} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>Applicant Income:</label>
        <input type="number" name="applicantIncome" value={loanApplication.applicantIncome} onChange={handleChange} />
      </div>
      <div>
        <label>Coapplicant Income:</label>
        <input type="number" name="coapplicantIncome" value={loanApplication.coapplicantIncome} onChange={handleChange} />
      </div>
      <div>
        <label>Loan Amount:</label>
        <input type="number" name="loanAmount" value={loanApplication.loanAmount} onChange={handleChange} />
      </div>
      <div>
        <label>Loan Term (in months):</label>
        <input type="number" name="loanTerm" value={loanApplication.loanTerm} onChange={handleChange} />
      </div>
      <div>
        <label>Credit History:</label>
        <select name="creditHistory" value={loanApplication.creditHistory} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">Good</option>
          <option value="0">Bad</option>
        </select>
      </div>
      <div>
        <label>Property Area:</label>
        <select name="propertyArea" value={loanApplication.propertyArea} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
          <option value="Semiurban">Semiurban</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoanApplicationForm;
