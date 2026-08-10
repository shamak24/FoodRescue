import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Donations from './pages/Donations'
import DonationDetails from './pages/DonationDetails'
import CreateDonation from './pages/CreateDonation'
import MyDonations from './pages/MyDonations'
import MyClaims from './pages/MyClaims'
import ClaimDetails from './pages/ClaimDetails'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/donations/:donationId" element={<DonationDetails />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-donation" element={<ProtectedRoute><CreateDonation /></ProtectedRoute>} />
          <Route path="/my-donations" element={<ProtectedRoute><MyDonations /></ProtectedRoute>} />
          <Route path="/my-claims" element={<ProtectedRoute><MyClaims /></ProtectedRoute>} />
          <Route path="/claims/:claimId" element={<ProtectedRoute><ClaimDetails /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
