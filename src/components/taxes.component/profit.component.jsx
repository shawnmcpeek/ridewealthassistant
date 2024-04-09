import React, { useState } from "react";
import incomeData from "../income.component/income.component.json";
import expenseData from "../expense.component/expense.component.json";
import mileageData from "../mileage.component/mileage.component.json";

const ProfitComponent = () => {
  // State variable to store calculated profit
  const [profitData, setProfitData] = useState(null);

  // Function to calculate profit
  const calculateProfit = () => {
    // Access data from imported JSON files
    const { income } = incomeData;
    const { expenses } = expenseData;
    const { mileage } = mileageData;

    // Calculate total income
    const totalIncome = income.reduce((total, item) => total + item.amount, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce(
      (total, item) => total + item.amount,
      0
    );

    // Calculate total mileage
    const totalMileage = mileage.reduce(
      (total, item) => total + item.distance,
      0
    );

    // Calculate profit
    const profit = totalIncome - (totalExpenses + totalMileage);

    // Update state with calculated profit
    setProfitData(profit);
  };

  // Function to handle form submission for profit calculation
  const handleProfitSubmit = (event) => {
    event.preventDefault();
    calculateProfit();
  };

  return (
    <div>
      <h2>Profit Calculation</h2>
      <form onSubmit={handleProfitSubmit}>
        {/* Input fields or other UI elements */}
        <button type="submit">Calculate Profit</button>
      </form>
      {/* Display profit data */}
      {profitData !== null && <p>Profit: ${profitData}</p>} 
    </div>
  );
};

export default ProfitComponent;
