import React, { useState } from "react";
import incomeData from "./income.component.json"; // Import income data from JSON file

const IncomeComponent = () => {
  // State variables to store form data
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here (e.g., submit to backend)
    console.log("Submitted:", { date, amount });
    // Save income data to JSON file
    saveIncome();
    // Clear the form fields
    setDate("");
    setAmount("");
  };

  const saveIncome = () => {
    // Prepare income entry object
    const newIncomeEntry = {
      date: date,
      amount: parseFloat(amount),
    };
    // Add new income entry to existing data
    incomeData.incomeEntries.push(newIncomeEntry);
    // Update JSON file
    console.log("Income data updated:", incomeData);
    // In a real-world application, you might want to save this data to a server or database instead
  };

  return (
    <div>
      <h2>Income Component</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Income:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Income Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IncomeComponent;
