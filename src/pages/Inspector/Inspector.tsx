import { Link } from "react-router-dom";
import ReportList from "../../components/Inspector/ReportList";

const Inspector = () => {
  return (
    <div className="pt-12">
      <ReportList />

      <div className="py-4">
        <Link to="/create-inspection">
          <button
            className="custom-button"
            style={{ backgroundColor: "#1d2268" }}
          >
            작성하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Inspector;
