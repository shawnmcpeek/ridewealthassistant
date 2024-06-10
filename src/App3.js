import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DefaultComponent from "./components/default.component/default.component";
import MileageComponent from "./components/mileage.component/mileage.component";
import IncomeComponent from "./components/income.component/income.component";
import ExpensesComponent from "./components/expenses.component/expense.component";
import TaxesComponent from "./components/taxes.component/estimated_tax.component.jsx";
import UserComponent from "./components/user.component/user.component.jsx";
//import "./App.scss";

function App() {
  console.log("App component rendered");

  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <DefaultComponent
                  onRender={() => console.log("DefaultComponent rendered")}
                />
              }
            />
            <Route
              path="/mileage"
              element={
                <MileageComponent
                  onRender={() => console.log("MileageComponent rendered")}
                />
              }
            />
            <Route
              path="/income"
              element={
                <IncomeComponent
                  onRender={() => console.log("IncomeComponent rendered")}
                />
              }
            />
            <Route
              path="/expenses"
              element={
                <ExpensesComponent
                  onRender={() => console.log("ExpensesComponent rendered")}
                />
              }
            />
            <Route
              path="/taxes"
              element={
                <TaxesComponent
                  onRender={() => console.log("TaxesComponent rendered")}
                />
              }
            />
            <Route
              path="/user"
              element={
                <UserComponent
                  onRender={() => console.log("UserComponent rendered")}
                />
              }
            />
          </Routes>
        </div>
        <nav className="bottom-navigation">
          <ul>
            <li>
              <Link to="/" onClick={() => console.log("Home link clicked")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mileage"
                onClick={() => console.log("Mileage link clicked")}
              >
                Mileage
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                onClick={() => console.log("Income link clicked")}
              >
                Income
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                onClick={() => console.log("Expenses link clicked")}
              >
                Expenses
              </Link>
            </li>
            <li>
              <Link
                to="/taxes"
                onClick={() => console.log("Taxes link clicked")}
              >
                Taxes
              </Link>
            </li>
            <li>
              <Link to="/user" onClick={() => console.log("User link clicked")}>
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
