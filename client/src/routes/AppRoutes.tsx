import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Rooms";
import StudyRoom from "../pages/StudyRoom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./ProtectedLayout";


const AppRoutes = () => {

  return (

    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        <Route
          path="/rooms"
          element={<Rooms />}
        />


        <Route
          path="/study-room/:id"
          element={<StudyRoom />}
        />

      </Route>


    </Routes>

  );

};


export default AppRoutes;