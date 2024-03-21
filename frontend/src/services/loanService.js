import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getEligibilityResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/eligibility-results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching eligibility results:', error);
  }
};

export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict_loan_eligibility`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting loan application:', error);
  }
};
