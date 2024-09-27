import React from "react";
import { RecoilRoot } from "recoil";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import SignUp from "./pages/User/SignUp";
import Login from "./pages/User/Login";
import Home from "./pages/Home";
import Inspector from "./pages/Inspector/Inspector";
import CreateReport from "./pages/Inspector/CreateReport";
import ReportDetail from "./pages/Inspector/ReportDetail";
import Manager from "./pages/Manager/Manager";
import Cleaner from "./pages/Cleaner/Cleaner";
import Collector from "./pages/Collector/Collector";

import "./App.css";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <MainContent />
      </Router>
    </RecoilRoot>
  );
};

const MainContent = () => {
  const location = useLocation();

  const hideHeaderOn = ["/", "/signup"];

  return (
    <React.Fragment>
      {!hideHeaderOn.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/inspector" element={<Inspector />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/report-detail/:reportId" element={<ReportDetail />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/cleaner" element={<Cleaner />} />
        <Route path="/collector" element={<Collector />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
