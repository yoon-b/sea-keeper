import { Link } from "react-router-dom";
import CleanupList from "../../components/Cleaner/CleanupList";

const Inspector = () => {
  return (
    <div>
      <CleanupList />

      <div className="py-4">
        <Link to="/create-cleanup">
          <button>작성하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Inspector;
