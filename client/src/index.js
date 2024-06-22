import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';




// ===================WEBSITE IMPORTS======================
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CategoryProducts from './pages/CategoryProducts';
import Authors from './pages/Authors';
import AuthorProducts from './pages/AuthorProducts';
import Logout from './pages/Logout';
import Products from './components/Products';
import About from './pages/About';
import DonateNow from './components/DonateNow';
import ScrollToTop from './components/ScrollToTop';

// ===================END AdminPanel Imports=======================================










// ===================AdminPanel Imports=======================================

import Settings from './components/Settings';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AdminErrorPage from './components/AdminPanel/AdminErrorPage';
import AdminCreateProduct from './components/AdminPanel/AdminCreateProduct';
import AdminEditProduct from './components/AdminPanel/AdminEditProduct';
import AdminDeleteProduct from './components/AdminPanel/AdminDeleteProduct';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import AdminProductDetaill from './components/AdminPanel/AdminProductDetaill'
import ProductsPage from './pages/ProductPage';

// ===================End AdminPanel Imports=======================================





// ===================WEBSITE ROUTES=======================================

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScrollToTop><Layout /></ScrollToTop>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "productpage", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "register", element: <Register /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "products/categories/:category", element: <CategoryProducts /> },
      { path: "logout", element: <Logout /> },
      { path: "contact", element: <About /> },
      { path: "donate-now", element: <DonateNow /> },
    ],
  },

  // ===================END WEBSITE ROUTES=======================================


  // ===================ADMIN ROUTES=======================================
  {
    path: "/admin",
    element: <ProtectedRoute element={<AdminLayout />} />,
    errorElement: <AdminErrorPage />,
    children: [
      { index: true, element: <AdminPanel /> },
      { path: "/admin/create", element: <AdminCreateProduct /> },
      { path: "/admin/myproducts/edit/:id", element: <AdminEditProduct /> },
      // { path: "/admin/myproducts/:id/", element: <AdminDeleteProduct /> },
      { path: "/admin/myproducts/:id", element: <AdminProductDetaill /> },
      { path: "/admin/myproducts", element: <AdminDashboard /> },
      { path: "/admin/settings", element: <Settings /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);



// ===================END ADMIN ROUTES=======================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);