import { Link } from "react-router-dom";
import CleanupList from "../../components/Cleaner/CleanupList";

const Inspector = () => {
  return (
    <div className="pt-12">
      <CleanupList />

      <div className="py-4">
        <Link to="/create-cleanup">
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
