import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

function LoanApprovalGraphs() {
  const [data, setData] = useState({
    propertyArea: [],
    education: [],
    maritalStatus: [],
    dependents: []
  });

  // Define processData using useCallback to ensure it's memoized
  const processData = useCallback((jsonData) => {
    let propertyAreaData = {}, educationData = {}, maritalStatusData = {}, dependentsData = {};

    jsonData.forEach(item => {
      const { Property_Area, Loan_Status, Education, Married, Dependents } = item;

      // Process data for pie charts
      if (Property_Area && Property_Area !== 'N/A') {
        propertyAreaData[Property_Area] = propertyAreaData[Property_Area] || { Approved: 0, NotApproved: 0 };
        propertyAreaData[Property_Area][Loan_Status === 'Y' ? 'Approved' : 'NotApproved']++;
      }

      if (Education && Education !== 'N/A') {
        educationData[Education] = educationData[Education] || { Approved: 0, NotApproved: 0 };
        educationData[Education][Loan_Status === 'Y' ? 'Approved' : 'NotApproved']++;
      }

      if (Married && Married !== 'N/A') {
        maritalStatusData[Married] = maritalStatusData[Married] || { Approved: 0, NotApproved: 0 };
        maritalStatusData[Married][Loan_Status === 'Y' ? 'Approved' : 'NotApproved']++;
      }

      if (Dependents && Dependents !== 'N/A') {
        dependentsData[Dependents] = dependentsData[Dependents] || { Approved: 0, NotApproved: 0 };
        dependentsData[Dependents][Loan_Status === 'Y' ? 'Approved' : 'NotApproved']++;
      }
    });

    setData({
      propertyArea: calculatePercentages(propertyAreaData),
      education: calculatePercentages(educationData),
      maritalStatus: calculatePercentages(maritalStatusData),
      dependents: calculatePercentages(dependentsData)
    });
  }, []);  // Dependencies array is empty if there are no external dependencies

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/data.csv');
      const csvData = await response.text();
      const jsonData = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;
      processData(jsonData);
    };

    fetchApplications();
  }, [processData]);  // Include processData in the dependency array

  const calculatePercentages = dataSet => Object.entries(dataSet).map(([name, counts]) => ({
    name,
    value: parseFloat((100 * counts.Approved / (counts.Approved + counts.NotApproved)).toFixed(1))
  }));

  const renderPieChart = (data, title) => {
    // Define a set of colors for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
    return (
      <div>
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={(entry) => entry.name + `: ${entry.value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="LoanApprovalGraphs">
      {renderPieChart(data.propertyArea, 'Property Area Approval Rates (%)')}
      {renderPieChart(data.education, 'Education Approval Rates (%)')}
      {renderPieChart(data.maritalStatus, 'Marital Status Approval Rates (%)')}
      {renderPieChart(data.dependents, 'Dependents Approval Rates (%)')}
    </div>
  );
}

export default LoanApprovalGraphs;
