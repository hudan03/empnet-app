import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Link, Route, Outlet, RouterProvider, useLocation, Routes } from "react-router-dom";
import './App.css';
import { Login } from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Navbar from './pages/Navbar';
import { Dashboard } from './pages/Dashboard';
import EmployeeAssignments from './pages/EmployeeAssignments';
import Profile from './pages/Profile';
import AdminNavbar from './pages/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import Announcement from './pages/Announcement';
import Accounts from './pages/Accounts';
import Assignments from './pages/Assignments';
import ManagerAssignments from './pages/ManagerAssignments';
import ManagerNavbar from './pages/ManagerNavbar';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
          <Route index element={<Login />} />
          <Route element={<Navbar />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employeeAssignments" element={<EmployeeAssignments />} />
              <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<AdminNavbar />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/announcements" element={<Announcement />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/assignments" element={<Assignments />} />
          </Route>
          <Route element={<ManagerNavbar />}>
              <Route path="/managerHome" element={<Home />} />
              <Route path="/managerDashboard" element={<ManagerDashboard />} />
              <Route path="/managerAssignments" element={<ManagerAssignments />} />
          </Route>
        </Route>
    )
  );
  
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
