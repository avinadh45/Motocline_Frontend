import { Routes, Route, } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';
// import { useAdminAuth } from './hooks/useAdminAuth';

import Dashboard from '../pages/User/Dashboard.tsx';
import Login from '../pages/User/Login.tsx';
import Register from '../pages/User/Register.tsx';
import Verify from '../pages/User/Verify.tsx';
import Landingpage from '../pages/User/Landingpage.tsx'
import ForgotPassword from '../pages/User/forgotpassword.tsx';
 import ResetPassword from '../pages/User/Resetpassword.tsx';
import ServiceCenterLogin from "../pages/ServiceCenter/login.tsx";
import ServiceCenterRegister from "../pages/ServiceCenter/register.tsx";
import ServiceCenterLayout from "../layouts/ServiceCenterLayout.tsx";
import ServiceCenterDashboard from "../pages/ServiceCenter/Dashboard.tsx";
 import ServiceCenterMechanic from "../pages/ServiceCenter/Mechanicpage.tsx"
 import MechanicLogin from '../pages/mechanic/login.tsx';
 import MechanicBashboard from "../pages/mechanic/Dahboard.tsx"
import AdminLogin from '../pages/admin/Login.tsx';
import AdminDashboard from '../pages/admin/Dashboard.tsx';
import AdminLayout from '../layouts/admin/adminLayout.tsx';
import AdminUserlist from "../pages/admin/UserList.tsx"
import ServiceCenterList from '../pages/admin/ServiceCenterList.tsx'
import UserDetails from '../pages/admin/userDetails.tsx'
import ServiceCenterDetails from '../pages/admin/ServiceCenterDetails.tsx'
import CategoryPage from '../pages/admin/category.tsx';
import ServiceCenterForgotPassword from "../pages/ServiceCenter/forgotpassword.tsx"
import ServiceCenterResetPassword from "../pages/ServiceCenter/resetpassword.tsx"
 import EditCategory from "../pages/admin/EditCategory.tsx"

function AppRoutes() {
  // const authProps = useAuth();
  // const adminAuthProps = useAdminAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify/>} /> 
       <Route path="/dashboard" element={<Dashboard  />} /> 
<Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} /> 
      <Route path="/service-center/login" element={<ServiceCenterLogin />} />
      <Route path="/service-center/register" element={<ServiceCenterRegister />} />
      <Route path="/service-center/forgot-password" element={<ServiceCenterForgotPassword />} />
       <Route path="/service-center/reset-password" element={<ServiceCenterResetPassword />} />
      <Route path="/service-center" element={<ServiceCenterLayout />}>
        <Route path="dashboard" element={<ServiceCenterDashboard />} />
        <Route path="mechanic" element={<ServiceCenterMechanic />} /> 
      </Route>
       <Route path="/mechanic/login" element={<MechanicLogin />} /> 
       <Route path="/mechanic/dashboard" element={<MechanicBashboard />} /> 
 

<Route path="/admin/login" element={<AdminLogin />} />

<Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="users" element={<AdminUserlist />} />
  <Route path="users/:id" element={<UserDetails />} />
  <Route path="garage" element={< ServiceCenterList/>}/>
  <Route path="garage/:id" element={<ServiceCenterDetails />} />
  <Route path="category" element={<CategoryPage/>}/>
  <Route path="category/edit/:id" element={<EditCategory />} />
</Route>

    </Routes>
  );
}

export default AppRoutes;
