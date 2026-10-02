import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';

import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

import AdminAppLayout from './Admin/AdminComponent/Layout/AdminAppLayout';
import AdminDashboard from './Admin/AdminPages/AdminDashboard';
import OrderSection from './Admin/AdminPages/OrderSection';
import AddProduct from './Admin/AdminPages/AddProduct';
import ManageInventory from './Admin/AdminPages/ManageInventory';
import SalesAnalytics from './Admin/AdminPages/SalesAnalytics';
import SellerApplications from './Admin/AdminPages/SellerApplications';
import ReviewModeration from './Admin/AdminPages/ReviewModeration';
import SiteContentManager from './Admin/AdminPages/SiteContentManager';
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
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/orders", element: <OrderSection /> },
      { path: "/admin/add-product", element: <AddProduct /> },
      { path: "/admin/inventory", element: <ManageInventory /> },
      { path: "/admin/analytics", element: <SalesAnalytics /> },
      { path: "/admin/seller-applications", element: <SellerApplications /> },
      { path: "/admin/reported-reviews", element: <ReviewModeration /> },
      { path: "/admin/site-content", element: <SiteContentManager /> },
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