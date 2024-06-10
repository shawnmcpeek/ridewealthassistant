import React from "react";
//import "./App.scss";

function NavbarComponent() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  console.log("NavbarComponent is rendering");

  return (
    <div className="navbar" id="myNavbar">
      <div className="nav-item">
        <button onClick={handleClick}>Home</button>
      </div>
    </div>
  );
}

export default NavbarComponent;
