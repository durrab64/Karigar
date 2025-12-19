import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 animate-fade-in">
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
