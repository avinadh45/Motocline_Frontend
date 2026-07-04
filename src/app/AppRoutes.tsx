import { Routes, Route, } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';
// import { useAdminAuth } from './hooks/useAdminAuth';

import Dashboard from '../features/user/pages/Dashboard.tsx';
import Login from '../features/user/pages/Login.tsx'
import Register from '../features/user/pages/Register.tsx';
import Verify from '../features/user/pages/Verify.tsx';
import Landingpage from '../features/user/pages/Landingpage.tsx'
import ForgotPassword from "../features/user/pages/forgotpassword.tsx"
 import ResetPassword from '../features/user/pages/Resetpassword.tsx';
import ServiceCenterLogin from "../features/ServiceCenter/pages/login.tsx";
import ServiceCenterRegister from "../features/ServiceCenter/pages/register.tsx";
import ServiceCenterLayout from "../features/ServiceCenter/layouts/ServiceCenterLayout.tsx";
import ServiceCenterDashboard from "../features/ServiceCenter/pages/Dashboard.tsx";
 import ServiceCenterMechanic from "../features/ServiceCenter/pages/Mechanicpage.tsx"
 import MechanicLogin from '../features/Mechanic/pages/login.tsx';
 import MechanicBashboard from "../features/Mechanic/pages/Dahboard.tsx"
import AdminLogin from '../features/Admin/pages/Login.tsx';
import AdminDashboard from '../features/Admin/pages/Dashboard.tsx';
import AdminLayout from '../features/Admin/layout/adminLayout.tsx';
import AdminUserlist from "../features/Admin/pages/UserList.tsx"
import ServiceCenterList from '../features/Admin/pages/ServiceCenterList.tsx'
import UserDetails from '../features/Admin/pages/userDetails.tsx'
import ServiceCenterDetails from '../features/Admin/pages/ServiceCenterDetails.tsx'
import CategoryPage from '../features/Admin/pages/category.tsx';
import ServiceCenterForgotPassword from "../features/ServiceCenter/pages/forgotpassword.tsx"
import ServiceCenterResetPassword from "../features/ServiceCenter/pages/resetpassword.tsx"
 import EditCategory from "../features/Admin/pages/EditCategory.tsx"

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
