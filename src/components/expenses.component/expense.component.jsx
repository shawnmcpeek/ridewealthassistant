import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../utils/firebase/firebase.utils";
import "../../App.scss";

function ExpenseComponent({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
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
      <h2>Enter Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-row">
            <label>
              <span>Date:</span>
              <input
                className="input"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Amount:</span>
              <input
                className="input"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-row">
            <label>
              <span>Category:</span>
              <select
                className="input"
                name="category"
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
            </label>
          </div>
        </div>
        <button className="primary-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseComponent;
