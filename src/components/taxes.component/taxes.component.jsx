import React, { useState } from "react";
import ProfitComponent from "./profit.component";

const ProfitTaxComponent = () => {
  const [showProfitCalculations, setShowProfitCalculations] = useState(false);
  const [showTaxEstimates, setShowTaxEstimates] = useState(false);
  const [profitYear, setProfitYear] = useState("");
  const [profitQuarter, setProfitQuarter] = useState("");
  const [taxYear, setTaxYear] = useState("");
  const [taxQuarter, setTaxQuarter] = useState("");
  const [grossTaxesData, setGrossTaxesData] = useState(null);
  const [netTaxesData, setNetTaxesData] = useState(null);

  const handleProfitCalculationClick = () => {
    setShowProfitCalculations(true);
    setGrossTaxesData(null);
    setNetTaxesData(null);
  };

  const handleTaxEstimateClick = (type) => {
    calculateTaxes(type);
    setShowProfitCalculations(false);
  };

  const calculateTaxes = (type) => {
    // Access data from your sources (e.g., incomeData, expenseData, mileageData)
    // Here you'll need to perform the tax calculations based on the selected type
    // For simplicity, let's assume it's a placeholder function
    const irsTax = 1000; // Placeholder value for demonstration
    const stateTax = 500; // Placeholder value for demonstration

    if (type === "gross") {
      setGrossTaxesData({ irsTax, stateTax });
    } else if (type === "net") {
      setNetTaxesData({ irsTax, stateTax });
    }
  };

  // Function to handle profit quarter selection
  const handleProfitQuarterChange = (event) => {
    setProfitQuarter(event.target.value);
  };

  // Function to handle profit year selection
  const handleProfitYearChange = (event) => {
    setProfitYear(event.target.value);
  };

  // Function to handle tax quarter selection
  const handleTaxQuarterChange = (event) => {
    setTaxQuarter(event.target.value);
  };

  // Function to handle tax year selection
  const handleTaxYearChange = (event) => {
    setTaxYear(event.target.value);
  };

  return (
    <div>
      <h2>Profit and Tax Calculations</h2>
      <div>
        <h3>Profit Calculations</h3>
        <div>
          <label>Select Quarter:</label>
          <select value={profitQuarter} onChange={handleProfitQuarterChange}>
            <option value="">Select Quarter</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
          <label>Select Year:</label>
          <select value={profitYear} onChange={handleProfitYearChange}>
            <option value="">Select Year</option>
            <option value="24">2024</option>
            <option value="25">2025</option>
            <option value="26">2026</option>
            <option value="27">2027</option>
            {/* Populate with years as needed */}
          </select>
        </div>
        <h4>Calculate profit (income-expenses) without considering mileage</h4>
        <button onClick={handleProfitCalculationClick}>
          Income Calc 1 (Income - Expenses)
        </button>
        <h4>Calculate profit considering mileage (income-expenses-mileage)</h4>
        <button onClick={() => handleTaxEstimateClick("mileage")}>
          Income Calc 2 (Income - Expenses - Mileage)
        </button>
        {showProfitCalculations && <ProfitComponent />}
      </div>
      <div>
        <h3>Tax Estimates</h3>
        <div>
          <label>Select Quarter:</label>
          <select value={taxQuarter} onChange={handleTaxQuarterChange}>
            <option value="">Select Quarter</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
          <label>Select Year:</label>
          <select value={taxYear} onChange={handleTaxYearChange}>
            <option value="">Select Year</option>
            <option value="24">2024</option>
            <option value="25">2025</option>
            <option value="26">2026</option>
            <option value="27">2027</option>
            {/* Populate with years as needed */}
          </select>
        </div>
        <h4>Calculate gross profit tax estimate</h4>
        <h4>This calculates taxes based on income only</h4>
        <button onClick={() => handleTaxEstimateClick("gross")}>
          Gross Profit Tax Estimate
        </button>
        <h4>Calculate net profit tax estimate</h4>
        <h4>This calculates taxes based on profit (income-expenses-mileage)</h4>
        <button onClick={() => handleTaxEstimateClick("net")}>
          Net Profit Tax Estimate
        </button>
        {/* Display tax estimates */}
        {grossTaxesData && (
          <div>
            <p>Gross Profit Tax Estimate:</p>
            <p>IRS Tax: ${grossTaxesData.irsTax}</p>
            <p>State Tax: ${grossTaxesData.stateTax}</p>
          </div>
        )}
        {netTaxesData && (
          <div>
            <p>Net Profit Tax Estimate:</p>
            <p>IRS Tax: ${netTaxesData.irsTax}</p>
            <p>State Tax: ${netTaxesData.stateTax}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitTaxComponent;
