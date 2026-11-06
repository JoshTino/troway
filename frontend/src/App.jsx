import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from "/components/Login"
import SignUp from "/components/SignUp"
import Reporter from "/components/Reporter"
import ReporterProfile from "/components/ReporterProfile"
import ModeratorProfile from "/components/ModeratorProfile"
import UserReportList from "/components/UserReportList"
import ReporterEdit from "/components/ReporterEdit"
import AdminMapView from "/components/AdminMapView"
import AdminDashboard from "/components/AdminDashboard"
import AdminViewUsers from "/components/AdminViewUsers"
import ModeratorMapView from "/components/ModeratorMapView"
import Profile from "/components/Profile"
import Unauthorized from "/components/Unauthorized"

import AddAdmin from "/components/AddAdmin"
import AddReporter from "/components/AddReporter"
import AddModerator from "/components/AddModerator"
import ModeratorDashboard from "/components/ModeratorDashboard"

import ProtectedRoute from "/protected routes/ProtectedRoute"


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />}/>
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

      <Route path="/reporter-profile" element={
        <ProtectedRoute allowedRoles={["user"]}> 
          <ReporterProfile />
      </ProtectedRoute>}
    />

    <Route path="/moderator-profile" element={
      <ProtectedRoute allowedRoles={["moderator"]}>
        <ModeratorProfile />
      </ProtectedRoute>
    }/>

      <Route path="/waste-location" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminMapView />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
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

        <Route path="/add-new-admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddAdmin />
          </ProtectedRoute>
        } />

        <Route path="add-moderator" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddModerator />
          </ProtectedRoute>
        } />

        <Route path="moderator-dashboard" element={
          <ProtectedRoute allowedRoles={["moderator"]}>
            <ModeratorDashboard />
          </ProtectedRoute>
        }
        />

        <Route path="/add-new-reporter" element={
          <ProtectedRoute allowedRoles={["moderator"]}>
            <AddReporter />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Profile />
          </ProtectedRoute>
        }/>
    </Routes>
  )
}

export default App
