import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from "/components/Login"
import SignUp from "/components/SignUp"
import Reporter from "/components/Reporter"
import UserReportList from "/components/UserReportList"
import ReporterEdit from "/components/ReporterEdit"
import AdminMapView from "/components/AdminMapView"
import AdminMetric from "/components/AdminMetric"
import AdminViewUsers from "/components/AdminViewUsers"
import ModeratorMapView from "/components/ModeratorMapView"
import Profile from "/components/Profile"

import ProtectedRoute from "/protected routes/ProtectedRoute"


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reporter" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <Reporter />
        </ProtectedRoute>
      } />

      <Route path="/reporter-edit/:id" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <ReporterEdit />
      </ProtectedRoute>
      } />

      <Route path="/reporter-list" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <UserReportList />
        </ProtectedRoute>
      } />

      <Route path="/waste-location" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminMapView />
        </ProtectedRoute>
      } />

      <Route path="/admin-metric" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminMetric />
        </ProtectedRoute>}
        />

        <Route path="/view-users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminViewUsers />
          </ProtectedRoute>
        }/>

        <Route path="/moderator-map-view" element={
          <ProtectedRoute allowedRoles={["moderator"]}>
            <ModeratorMapView />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
    </Routes>
  )
}

export default App
