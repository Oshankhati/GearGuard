import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import AdminPage from './Admin Page/AdminPage'
import MaintenanceManagerPage from './Maintenance Manager/MaintenanceManagerPage'
import TechnicianPage from './TechnicianPage/TechnicianPage'
import UserPage from './User Page/UserPage'
import CalendarView from './Calender/Calender'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manager" element={<MaintenanceManagerPage />} />
        <Route path="/technician" element={<TechnicianPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/calender" element={<CalendarView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
