import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DefaultContentComponent from "./components/default.component/default.component";
import NavbarComponent from "./components/navbar.component/navbar.component";
import TopBarComponent from "./components/topbar.component/topbar.component";
import MileageComponent from "./components/mileage.component/mileage.component";
import ExpenseComponent from "./components/expense.component/expense.component";
import IncomeComponent from "./components/income.component/income.component";
//import MileageCalculator from "./components/taxes.component/other_attempts/mileage.component";
import MileagePullComponent from "./components/taxes.component/mileage_pull.component";
import UserComponent from "./components/user.component/user.component";
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
          {activeComponent === "taxes" && (
            <>
              <MileagePullComponent />
              {/* Uncomment below components if needed */}
              {/* <TimeframeSelector />
              <MileageCalculator />
              <ProfitCalculation1 />
              <ProfitCalculation2 />
              <GrossProfitTaxEstimate />
              <NetProfitTaxEstimate /> */}
            </>
          )}

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
