import { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AllApointment = lazy(() => import("./pages/Admin/AllApointment"));
const AddDoctor = lazy(() => import("./pages/Admin/AddDoctor"));
const DoctorsList = lazy(() => import("./pages/Admin/DoctorsList"));
const DoctorDashboard = lazy(() => import("./pages/Doctor/DoctorDashboard"));
const DoctorAppointments = lazy(() => import("./pages/Doctor/DoctorAppointments"));
const DoctorProfile = lazy(() => import("./pages/Doctor/DoctorProfile"));

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <Router>
      <ToastContainer />
      {aToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllApointment />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
};

export default App;
