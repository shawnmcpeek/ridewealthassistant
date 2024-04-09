import React, { useState } from "react";
import expenseData from "./expense.component.json"; // Import expense data from JSON file

const ExpenseComponent = () => {
  // State variables to store form data
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here (e.g., submit to backend)
    console.log("Submitted:", { date, amount, category });
    // Save expense data to JSON file
    saveExpense();
    // Clear the form fields
    setDate("");
    setAmount("");
    setCategory("");
  };

  const saveExpense = () => {
    // Prepare expense entry object
    const newExpenseEntry = {
      date: date,
      amount: parseFloat(amount),
      category: category,
    };
    // Add new expense entry to existing data
    expenseData.expenseEntries.push(newExpenseEntry);
    // Update JSON file
    console.log("Expense data updated:", expenseData);
    // In a real-world application, you might want to save this data to a server or database instead
  };

  return (
    <div>
      <h2>Expense Component</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Advertising">Advertising</option>
            <option value="Car and Truck">Car and Truck</option>
            <option value="Rent or Lease">Rent or Lease</option>
            <option value="Depreciation and section 179 expense deduction">
              Depreciation and section 179 expense deduction
            </option>
            <option value="Insurance">Insurance</option>
            <option value="Legal and professional services">
              Legal and professional services
            </option>
            <option value="Office expense">Office expense</option>
            <option value="Supplies">Supplies</option>
            <option value="Auto Loan/Lease">Auto Loan/Lease</option>
            <option value="Supplies">Supplies</option>
            <option value="Taxes and licenses">Taxes and licenses</option>
            <option value="Travel and meals">Travel and meals</option>
            <option value="Utilities">Utilities</option>
            {/* Add more options from IRS schedule C business categories */}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseComponent;
