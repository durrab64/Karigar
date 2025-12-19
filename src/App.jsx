import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import PublicServices from './pages/PublicServices';
import ServiceCategory from './pages/ServiceCategory';
import MainLayout from './components/Layout/MainLayout';
import Explore from './pages/customer/Explore';
import ProviderProfile from './pages/customer/ProviderProfile';
import CustomerBookings from './pages/customer/Bookings';
import ProviderDashboard from './pages/provider/Dashboard';
import MyServices from './pages/provider/MyServices';
import AdminOverview from './pages/admin/Overview';
import UserManagement from './pages/admin/UserManagement';
import Providers from './pages/admin/Providers';
import ServicesList from './pages/admin/ServicesList';
import Reviews from './pages/admin/Reviews';
import Disputes from './pages/admin/Disputes';
import AdminLayout from './components/Layout/AdminLayout';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes (No Sidebar) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/services" element={<PublicServices />} />
      <Route path="/services/:category" element={<ServiceCategory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Authenticated Routes (With Sidebar via MainLayout) */}
      <Route element={<MainLayout />}>
        {/* Customer Routes */}
        <Route path="/customer" element={user?.role === 'customer' ? <Explore /> : <Navigate to="/login" />} />
        <Route path="/customer/provider/:id" element={user?.role === 'customer' ? <ProviderProfile /> : <Navigate to="/login" />} />
        <Route path="/customer/bookings" element={user?.role === 'customer' ? <CustomerBookings /> : <Navigate to="/login" />} />

        {/* Provider Routes */}
        <Route path="/provider" element={user?.role === 'provider' ? <ProviderDashboard /> : <Navigate to="/login" />} />
        <Route path="/provider/services" element={user?.role === 'provider' ? <MyServices /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="providers" element={<Providers />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="disputes" element={<Disputes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
