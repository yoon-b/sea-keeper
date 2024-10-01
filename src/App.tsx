import React from "react";
import { RecoilRoot } from "recoil";
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

import "./App.css";

const queryClient = new QueryClient();

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

  const hideHeaderOn = ["/", "/signup"];

  return (
    <React.Fragment>
      {!hideHeaderOn.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/inspector" element={<Inspector />} />
        <Route path="/create-inspection" element={<CreateInspection />} />
        <Route path="/report-detail/:reportId" element={<ReportDetail />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/cleaner" element={<Cleaner />} />
        <Route path="/create-cleanup" element={<CreateCleanup />} />
        <Route path="/cleanup-detail/:reportId" element={<CleanupDetail />} />
        <Route path="/collector" element={<Collector />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
