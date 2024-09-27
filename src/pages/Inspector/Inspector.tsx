import React from "react";
import { Link } from "react-router-dom";
import ReportList from "../../components/Inspector/ReportList";

const Inspector = () => {
  return (
    <div>
      <ReportList />
      <Link to="/create-report">
        <button>Create Report</button>
      </Link>
    </div>
  );
};

export default Inspector;
