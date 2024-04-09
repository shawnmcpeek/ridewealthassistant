import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DefaultContentComponent from "./components/default.component/default.component";
import NavbarComponent from "./components/navbar.component/navbar.component";
import TopBarComponent from "./components/topbar.component/topbar.component";
import MileageComponent from "./components/mileage.component/mileage.component.jsx";
import ExpenseComponent from "./components/expense.component/expense.component.jsx";
import IncomeComponent from "./components/income.component/income.component.jsx";
import TaxesComponent from "./components/taxes.component/taxes.component.jsx";
import UserComponent from "./components/user.component/user.component.jsx";
import "./App.scss";

function App() {
  const [activeComponent, setActiveComponent] = useState("default");

  const toggleComponentVisibility = (componentName) => {
    setActiveComponent((prevComponent) =>
      prevComponent === componentName ? "default" : componentName
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <TopBarComponent />
          {/* Render the active component based on state */}
          {activeComponent === "default" && <DefaultContentComponent />}
          {activeComponent === "mileage" && <MileageComponent />}
          {activeComponent === "expenses" && <ExpenseComponent />}
          {activeComponent === "income" && <IncomeComponent />}
          {activeComponent === "taxes" && <TaxesComponent />}
          {activeComponent === "user" && <UserComponent />}
          <NavbarComponent
            toggleComponentVisibility={toggleComponentVisibility}
          />
        </header>
      </div>
    </Router>
  );
}

export default App;
