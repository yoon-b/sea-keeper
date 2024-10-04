import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import Home from "@mui/icons-material/Home";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Close from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";
import { toast } from "react-hot-toast";

const menulist = [
  {
    link: "/inspector",
    name: "조사하기",
  },
  {
    link: "/manager",
    name: "관리하기",
  },
  {
    link: "/cleaner",
    name: "청소하기",
  },
  {
    link: "/collector",
    name: "운반하기",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useRecoilState(userAtom);

  const goBack = () => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments[1] === "cleanup-detail") {
      navigate("/cleaner", { replace: true });
    } else if (pathSegments[1] === "report-detail") {
      navigate("/inspector", { replace: true });
    } else {
      navigate(-1);
    }
  };

  const goHome = () => {
    navigate("/home");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link: string) => {
    toggleMenu();
    navigate(link, { replace: true });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    toast.success("로그아웃 성공!");
    navigate("/");
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 left-0">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMenu}
        ></div>
      )}
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <div className="flex justify-center items-center">
            {location.pathname !== "/home" && (
              <div
                onClick={goBack}
                className="inline-flex items-center justify-center p-2 w-11 h-11"
              >
                <ArrowBackIosNewIcon />
              </div>
            )}

            <div className="p-2 text-xl">
              {user ? (
                <>
                  {user.name}
                  <span className="text-base">님</span>
                </>
              ) : (
                "바다환경 지킴이"
              )}
            </div>
          </div>
          <div className="flex w-2/6 justify-end">
            {location.pathname !== "/home" && (
              <div className="p-2 w-11 h-11" onClick={goHome}>
                <Home />
              </div>
            )}
            <div onClick={toggleMenu} className="p-2 w-11 h-11">
              <Menu />
            </div>
          </div>
        </div>

        {/* 메뉴 */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isMenuOpen ? "" : "translate-x-full"
          } bg-white w-44 p-4 transition-transform duration-300 ease-in-out shadow-lg`}
        >
          {/* 메뉴 내용 */}
          <div className="flex jusfify-end">
            <div onClick={toggleMenu} className="w-10">
              <Close />
            </div>
          </div>
          <ul>
            {menulist.map((menu) => (
              <li
                key={menu.link}
                onClick={() => handleLinkClick(menu.link)}
                className="p-2"
              >
                <Link to={menu.link} style={{ color: "black" }}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-4" />
          <div onClick={handleLogout}>
            <Logout color="info" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
