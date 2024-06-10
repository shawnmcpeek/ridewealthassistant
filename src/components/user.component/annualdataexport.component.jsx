import React, { useState } from "react";
import TimeSelectComponent from "../time_select.component/time_select.component";
import DataFetcher from "./data_fetcher.component";

function AnnualDataExportComponent({ onRender, onSuccess }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleTimeSelect = (quarter, year) => {
    setSelectedQuarter(quarter);
    setSelectedYear(year);
  };

  return (
    <div>
      <h2>Annual Data Export</h2>
      <TimeSelectComponent onSelect={handleTimeSelect} />
      {selectedQuarter && selectedYear && (
        <DataFetcher
          selectedQuarter={selectedQuarter}
          selectedYear={selectedYear}
          onSuccess={onSuccess} // Pass the onSuccess prop down
        />
      )}
    </div>
  ); 
};

export default AnnualDataExportComponent;
