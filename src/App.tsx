import React, { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Header from "./components/Common/Header";
import SignUp from "./pages/User/SignUp";
import Login from "./pages/User/Login";
import Home from "./pages/Home";
import Inspector from "./pages/Inspector/Inspector";
import CreateInspection from "./pages/Inspector/CreateInspection";
import ReportDetail from "./pages/Inspector/ReportDetail";
import Manager from "./pages/Manager/Manager";
import Cleaner from "./pages/Cleaner/Cleaner";
import CreateCleanup from "./pages/Cleaner/CreateCleanup";
import CleanupDetail from "./pages/Cleaner/CleanupDetail";
import Collector from "./pages/Collector/Collector";

import NotFound from "./pages/NotFound";
// import Mobile from "./components/Common/Mobile";

import { pageAtom } from "./recoil/pageAtom";
import "./App.css";

// QueryClient 설정
const queryClient = new QueryClient();

const routes = [
  { path: "/", component: <Login />, title: "로그인" },
  { path: "/home", component: <Home />, title: "바다환경 지킴이" },
  { path: "/signup", component: <SignUp />, title: "회원가입" },
  { path: "/inspector", component: <Inspector />, title: "조사하기" },
  {
    path: "/create-inspection",
    component: <CreateInspection />,
    title: "조사 기록 작성하기",
  },
  {
    path: "/report-detail/:reportId",
    component: <ReportDetail />,
    title: "조사 기록 상세보기",
  },
  { path: "/manager", component: <Manager />, title: "관리하기" },
  { path: "/cleaner", component: <Cleaner />, title: "청소하기" },
  {
    path: "/create-cleanup",
    component: <CreateCleanup />,
    title: "청소 기록 작성하기",
  },
  {
    path: "/cleanup-detail/:reportId",
    component: <CleanupDetail />,
    title: "청소 기록 상세보기",
  },
  { path: "/collector", component: <Collector />, title: "수거하기" },
  { path: "/*", component: <NotFound />, title: "Not Found" },
];

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainContent />
          <Toaster />
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const MainContent = () => {
  const location = useLocation();
  const setPageTitle = useSetRecoilState(pageAtom);

  const hideHeaderOn = ["/", "/signup"];

  useEffect(() => {
    const currentRoute = routes.find((route) =>
      route.path.includes(":")
        ? location.pathname.startsWith(route.path.split(":")[0])
        : route.path === location.pathname
    );
    if (currentRoute) {
      setPageTitle(currentRoute.title);
    }
  }, [location.pathname, setPageTitle]);

  return (
    <React.Fragment>
      {!hideHeaderOn.includes(location.pathname) && <Header />}

      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={component} />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default App;
