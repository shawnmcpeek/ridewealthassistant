import React from "react";
//import "./app3.scss";

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
