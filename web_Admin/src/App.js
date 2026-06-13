import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import AccountManagement from "./components/AccountManagement"
import BlockchainHistory from "./components/BlockchainHistory"
import LoginScreen from "./components/auth/LoginScreen"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

// Auth wrapper component
function AuthWrapper() {
  const { isAuthenticated, loading } = useAuth()
  // eslint-disable-next-line no-unused-vars
  const [authMode, setAuthMode] = useState("login")

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Đang kiểm tra đăng nhập...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen onSwitchToRegister={() => setAuthMode("register")} />
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
        <Route
          path="/login"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/account"
          element={<AccountManagement />}
        />
        <Route
          path="/blockchain"
          element={<BlockchainHistory />}
        />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL || ""}>
        <AuthWrapper />
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
      />
    </AuthProvider>
  )
}

export default App
