https://troway1.onrender.comimport { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from "/components/Login"
import SignUp from "/components/SignUp"
import Reporter from "/components/Reporter"
import UserReportList from "/components/UserReportList"
import ReporterEdit from "/components/ReporterEdit"
import AdminMapView from "/components/AdminMapView"

import ProtectedRoute from "/protected routes/ProtectedRoute"


function App() {

  return (
    <Routes>
      <Route path="https://troway1.onrender.com/login" element={<Login />} />
      <Route path="https://troway1.onrender.com/signup" element={<SignUp />} />
      <Route path="https://troway1.onrender.com/reporter" element={
        <ProtectedRoute>
          <Reporter />
        </ProtectedRoute>
      } />

      <Route path="https://troway1.onrender.com/reporter-edit/:id" element={
        <ProtectedRoute>
          <ReporterEdit />
      </ProtectedRoute>
      } />

      <Route path="https://troway1.onrender.com/reporter-list" element={
        <ProtectedRoute>
          <UserReportList />
        </ProtectedRoute>
      } />

      <Route path="https://troway1.onrender.com/waste-location" element={
        <ProtectedRoute>
          <AdminMapView />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
