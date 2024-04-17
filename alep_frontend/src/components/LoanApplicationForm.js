import React, { useState } from 'react';

function LoanApplicationForm() {
  const [formState, setFormState] = useState({
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
    propertyArea: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }
    try {
      const payload = {
        ...formState,
        user_id: userId, // Include the user ID in the payload
      };
      const response = await fetch('/api/predict_loan_eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      alert(`Application ${result.status}`);
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="LoanApplicationForm">
      <h2>Loan Application Form</h2>
      <div className='form-container' style={{marginBottom: '100px'}}>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="gender">Gender:</label>
          <select name="gender" value={formState.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="married">Married:</label>
          <select name="married" value={formState.married} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="dependents">Dependents:</label>
          <input type="number" name="dependents" value={formState.dependents} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor="education">Education:</label>
          <select name="education" value={formState.education} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="selfEmployed">Self Employed:</label>
          <select name="selfEmployed" value={formState.selfEmployed} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="applicantIncome">Applicant Income:</label>
          <div className='income-input'>
          <span>$</span>
          <input type="number" name="applicantIncome" value={formState.applicantIncome} onChange={handleChange} required />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="coapplicantIncome">Coapplicant Income:</label>
          <div className='income-input'>
          <span>$</span>
          <input type="number" name="coapplicantIncome" value={formState.coapplicantIncome} onChange={handleChange} required />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="loanAmount">Loan Amount:</label>
          <div className='income-input'>
          <span>$</span>
          <input type="number" name="loanAmount" value={formState.loanAmount} onChange={handleChange} required />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="loanTerm">Loan Term (in months):</label>
          <input type="number" name="loanTerm" value={formState.loanTerm} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor="creditHistory">Credit History:</label>
          <select name="creditHistory" value={formState.creditHistory} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Good</option>
            <option value="0">Bad</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="propertyArea">Property Area:</label>
          <select name="propertyArea" value={formState.propertyArea} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Semiurban">Semiurban</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default LoanApplicationForm;
