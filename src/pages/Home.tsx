import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoil/userAtom";
import LinkCardGrid from "../components/Home/LinkCardGrid";

const Home = () => {
  const [isManager, setIsManager] = useState(false);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    setIsManager(user?.role === "ADMIN");
  }, []);

  useEffect(() => {
    const preventSwipeBack = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventSwipeBack, { passive: false });

    return () => {
      window.removeEventListener("touchmove", preventSwipeBack);
    };
  }, []);

  return (
    <div className="page-container flex flex-col">
      <LinkCardGrid mode={isManager ? "manager" : "default"} />
    </div>
  );
};

export default Home;
