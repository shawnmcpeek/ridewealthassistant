import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../utils/firebase/firebase.utils";

const ExpenseComponent = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date(date);
    const expenseValue = parseFloat(amount);

    if (isNaN(expenseValue) || !currentDate || !category) {
      console.error("Invalid expense input.");
      return;
    }

    const expenseData = {
      date: currentDate,
      amount: expenseValue,
      category: category,
    };

    console.log("Expense data to be saved:", expenseData);

    try {
      const docRef = await addDoc(
        collection(getFirestore(app), "expenses"),
        expenseData
      );
      console.log("Expense document written with ID:", docRef.id);
      setDate("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  console.log("Rendered ExpenseComponent");

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
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseComponent;
