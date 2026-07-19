import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <div className="relative min-h-screen w-full isolate font-sans text-on-background bg-background selection:bg-primary/30">
      <div className="relative z-10">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <NoteDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;