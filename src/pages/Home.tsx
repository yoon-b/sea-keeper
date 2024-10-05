import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { largeTextAtom } from "../recoil/largeTextAtom";
import LinkCardGrid from "../components/Home/LinkCardGrid";

const Home = () => {
  const [isLargeTextMode, setIsLargeTextMode] = useRecoilState(largeTextAtom);

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

  const handleToggle = () => {
    setIsLargeTextMode((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full fixed top-24">
        <p className="text-indigo-900 mr-1 font-semibold">큰글자 모드</p>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id="switch"
            type="checkbox"
            className="peer sr-only"
            checked={isLargeTextMode}
            onChange={handleToggle}
          />
          <label htmlFor="switch" className="hidden"></label>
          <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
        </label>
      </div>
      <div className="page-container flex flex-col">
        <LinkCardGrid mode={isLargeTextMode ? "default" : "manager"} />
      </div>
    </div>
  );
};

export default Home;
