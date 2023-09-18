import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import Spinners from "./component/Spinners";
import PublicRoutes from "./component/PublicRoutes";
import ProtectedRoutes from "./component/ProtectedRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import Appointments from "./pages/Appointments";
import Notification from "./pages/Notification";
import BookingPage from "./pages/BookingPage";
import DoctorAppointments from "./pages/doctor/DoctorAppointments"

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinners />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor/Profile/:id"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoutes>
                <BookingPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoutes>
                <Notification />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoutes>
                <DoctorAppointments />
              </ProtectedRoutes>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
