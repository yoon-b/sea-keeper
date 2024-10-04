import { useEffect, useState } from "react";
import LinkCardGrid from "../components/Home/LinkCardGrid";

const Home = () => {
  const [isManagerMode, setIsManagerMode] = useState(false);

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
      <div className="flex justify-end items-center mb-4 w-full mr-2 fixed top-16">
        <span className="mr-2 text-sm text-black">관리자</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id="switch"
            type="checkbox"
            className="peer sr-only"
            checked={isManagerMode}
            onChange={() => setIsManagerMode((prev) => !prev)}
          />
          <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
        </label>
      </div>

      <LinkCardGrid mode={isManagerMode ? "manager" : "default"} />
    </div>
  );
};

export default Home;
