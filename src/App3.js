import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import DefaultComponent from "./components/default.component/default.component";
import MileageComponent from "./components/mileage.component/mileage.component";
import IncomeComponent from "./components/income.component/income.component";
import ExpensesComponent from "./components/expenses.component/expense.component";
import TaxesComponent from "./components/taxes.component/estimated_tax.component.jsx";
import UserComponent from "./components/user.component/user.component.jsx";
import "./app3.scss";
import homeIcon from "./assets/icons/icons8-home-48.png";
import incomeIcon from "./assets/icons/icons8-dollar-50.png";
import expenseIcon from "./assets/icons/icons8-receipt-48 (2).png";
import taxIcon from "./assets/icons/icons8-tax-48 (1).png";
import MileageIcon from "./assets/icons/icons8-notebook-64.png";
import UserIcon from "./assets/icons/icons8-user-48 (1).png";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Header = () => {
  const location = useLocation();
  const currentRoute = location.pathname.slice(1) || "Home";
  const capitalizedRoute = capitalizeWords(currentRoute);

  return (
    <header className="header">
      <h1>{capitalizedRoute}</h1>
    </header>
  );
};

function App() {
  const [userId, setUserId] = useState("");

  const handleUserSignIn = (userId) => {
    setUserId(userId);
  };

  console.log("App component rendered");

  return (
    <Router>
      <div className="app-container">
        <Header />
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
                  userId={userId}
                />
              }
            />
            <Route
              path="/income"
              element={
                <IncomeComponent
                  onRender={() => console.log("IncomeComponent rendered")}
                  userId={userId}
                />
              }
            />
            <Route
              path="/expenses"
              element={
                <ExpensesComponent
                  onRender={() => console.log("ExpensesComponent rendered")}
                  userId={userId}
                />
              }
            />
            <Route
              path="/taxes/*"
              element={
                <TaxesComponent
                  onRender={() => console.log("TaxesComponent rendered")}
                />
              }
            />
            <Route
              path="/user/*"
              element={
                <UserComponent
                  onRender={() => console.log("UserComponent rendered")}
                  onUserSignIn={handleUserSignIn}
                />
              }
            />
          </Routes>
        </div>
        <nav className="bottom-navigation">
          <ul>
            <li>
              <Link to="/" onClick={() => console.log("Home link clicked")}>
                <img src={homeIcon} alt="Home" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mileage"
                onClick={() => console.log("Mileage link clicked")}
              >
                <img src={MileageIcon} alt="Mileage" />
                Mileage
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                onClick={() => console.log("Income link clicked")}
              >
                <img src={incomeIcon} alt="Income" />
                Income
              </Link>
            </li>
            <li>
              <Link
                to="/expenses"
                onClick={() => console.log("Expenses link clicked")}
              >
                <img src={expenseIcon} alt="Expenses" />
                Expenses
              </Link>
            </li>
            <li>
              <Link
                to="/taxes"
                onClick={() => console.log("Taxes link clicked")}
              >
                <img src={taxIcon} alt="Taxes" />
                Taxes
              </Link>
            </li>
            <li>
              <Link to="/user" onClick={() => console.log("User link clicked")}>
                <img src={UserIcon} alt="User" />
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
