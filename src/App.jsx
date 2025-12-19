import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/Layout/MainLayout';
import Explore from './pages/customer/Explore';
import ProviderProfile from './pages/customer/ProviderProfile';
import CustomerBookings from './pages/customer/Bookings';
import ProviderDashboard from './pages/provider/Dashboard';
import MyServices from './pages/provider/MyServices';
import AdminOverview from './pages/admin/Overview';
import UserManagement from './pages/admin/UserManagement';
import * as Pages from './pages/placeholders';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        {/* Customer Routes */}
        <Route path="/customer" element={user?.role === 'customer' ? <Explore /> : <Navigate to="/login" />} />
        <Route path="/customer/provider/:id" element={user?.role === 'customer' ? <ProviderProfile /> : <Navigate to="/login" />} />
        <Route path="/customer/bookings" element={user?.role === 'customer' ? <CustomerBookings /> : <Navigate to="/login" />} />

        {/* Provider Routes */}
        <Route path="/provider" element={user?.role === 'provider' ? <ProviderDashboard /> : <Navigate to="/login" />} />
        <Route path="/provider/services" element={user?.role === 'provider' ? <MyServices /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={user?.role === 'admin' ? <AdminOverview /> : <Navigate to="/login" />} />
        <Route path="/admin/users" element={user?.role === 'admin' ? <UserManagement /> : <Navigate to="/login" />} />
      </Route>

      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
