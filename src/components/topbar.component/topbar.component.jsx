import React from "react";
import "../../app3.scss";

function TopBarComponent({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
  return (
    <div className="topbar active bruno-ace-regular">
      <h1>RideWealth Assistant</h1>
    </div>
  );
}

export default TopBarComponent;
