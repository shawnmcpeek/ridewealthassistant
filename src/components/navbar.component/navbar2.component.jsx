import React from "react";
import "../../app3.scss";
import notebookIcon from "../../assets/icons/icons8-notebook-48.png";
import dollarIcon from "../../assets/icons/icons8-dollar-48.png";
import receiptIcon from "../../assets/icons/icons8-receipt-48.png";
import taxesIcon from "../../assets/icons/icons8-tax-48.png";
import userIcon from "../../assets/icons/icons8-user-48.png";
import homeIcon from "../../assets/icons/icons8-home-64.png";
import "../../app3.scss";

function NavbarComponent() {
  const handleClick = (path) => {
    console.log("Button clicked, navigating to:", path);
    // Add your navigation logic here
  };

  console.log("NavbarComponent is rendering");

  return (
    <div className="navbar" id="myNavbar">
      <div className="nav-item">
        <button onClick={() => handleClick("/")}>Home</button>
      </div>
      <div className="nav-item">
        <button onClick={() => handleClick("/mileage")}>Mileage</button>
      </div>
      <div className="nav-item">
        <button onClick={() => handleClick("/expense")}>Expenses</button>
      </div>
      <div className="nav-item">
        <button onClick={() => handleClick("/income")}>Income</button>
      </div>
      <div className="nav-item">
        <button onClick={() => handleClick("/tax_estimates")}>
          Tax Estimates
        </button>
      </div>
      <div className="nav-item">
        <button onClick={() => handleClick("/user")}>User</button>
      </div>
    </div>
  );
}

export default NavbarComponent;
