import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';

import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

import AdminAppLayout from './Admin/AdminComponent/Layout/AdminAppLayout';
import SuperAdminDashboard from './Admin/AdminPages/SuperAdminDashboard';
import AdminSecuritySettings from './Admin/AdminPages/AdminSecuritySettings';
import AdminAuthPage from './Admin/AdminPages/AdminAuthPage';
import ProtectedSuperAdminRoute from './Admin/AdminComponent/ProtectedSuperAdminRoute';
import NotFound from './Client/ClientsComponent/NotFound';

const getBasename = () => {
  const path = window.location.pathname;
  if (path.startsWith('/greencards-superadmin-portal')) {
    return '/greencards-superadmin-portal';
  }
  return '/';
};

const router = createBrowserRouter([
  {
    path: "/admin/auth",
    element: <AdminAuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedSuperAdminRoute>
        <AdminAppLayout />
      </ProtectedSuperAdminRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/admin/superadmin" replace /> },
      { path: "/admin", element: <Navigate to="/admin/superadmin" replace /> },
      { path: "/admin/superadmin", element: <SuperAdminDashboard /> },
      { path: "/admin/security", element: <AdminSecuritySettings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
], { basename: getBasename() });

function App() {
  return (
    <AdminAuthProvider>
      <ProductProvider>
        <OrderProvider>
          <RouterProvider router={router} />
        </OrderProvider>
      </ProductProvider>
    </AdminAuthProvider>
  );
}

export default App;