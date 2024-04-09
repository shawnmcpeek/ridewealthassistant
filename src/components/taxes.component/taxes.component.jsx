import React, { useState } from "react";
import incomeData from "../income.component/income.component.json";

const TaxEstimateComponent = () => {
  // State variables to store form data and results
  const [year, setYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [grossTaxesData, setGrossTaxesData] = useState(null);
  const [netTaxesData, setNetTaxesData] = useState(null);

  // Function to calculate taxes for each financial quarter based on sales
  const calculateGrossTaxes = () => {
    // Access data from imported JSON files
    const { income } = incomeData;

    // Filter income data for the selected year and quarter
    const filteredIncome = income.filter(
      (item) => item.year === year && item.quarter === quarter
    );

    // Calculate total sales for the quarter
    const totalSales = filteredIncome.reduce(
      (total, item) => total + item.amount,
      0
    );

    // Calculate IRS and state estimated taxes (15% and 5% of total sales respectively)
    const irsTax = totalSales * 0.15;
    const stateTax = totalSales * 0.05;

    // Update state with calculated taxes data for sales
    setGrossTaxesData({ irsTax, stateTax });
  };

  // Function to calculate taxes for each financial quarter based on profit
  const calculateNetTaxes = () => {
    // Access data from imported JSON files
    const { income } = incomeData;

    // Filter income data for the selected year and quarter
    const filteredIncome = income.filter(
      (item) => item.year === year && item.quarter === quarter
    );

    // Calculate total profit for the quarter (including expenses and mileage)
    const totalProfit = filteredIncome.reduce(
      (total, item) => total + item.profit,
      0
    );

    // Calculate IRS and state estimated taxes (15% and 5% of total profit respectively)
    const irsTax = totalProfit * 0.15;
    const stateTax = totalProfit * 0.05;

    // Update state with calculated taxes data for profit
    setNetTaxesData({ irsTax, stateTax });
  };

  // Function to handle form submission for taxes estimation
  const handleTaxesSubmit = (event) => {
    event.preventDefault();

    // Check if year and quarter are selected
    if (year === "" || quarter === "") {
      alert("Please select both year and quarter.");
      return;
    }

    // Calculate taxes for both gross and net profit
    calculateGrossTaxes();
    calculateNetTaxes();
  };

  return (
    <div>
      <h2>Tax Estimation</h2>
      <form onSubmit={handleTaxesSubmit}>
        {/* Input fields for selecting year and quarter */}
        <button type="submit">Calculate Estimated Taxes</button>
      </form>
      {/* Display taxes data */}
      {grossTaxesData && netTaxesData && (
        <div>
          <p>Gross Profit Tax Estimate (Sales):</p>
          <p>IRS Tax: ${grossTaxesData.irsTax}</p>
          <p>State Tax: ${grossTaxesData.stateTax}</p>
          <br />
          <p>Net Profit Tax Estimate (Profit):</p>
          <p>IRS Tax: ${netTaxesData.irsTax}</p>
          <p>State Tax: ${netTaxesData.stateTax}</p>
        </div>
      )}
    </div>
  );
};

export default TaxEstimateComponent;
