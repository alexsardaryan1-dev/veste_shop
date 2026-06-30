import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';

import Home from '../pages/Home/Home';
import Shop from '../pages/Shop';
import Lookbook from '../pages/Lookbook';
import VisitUs from '../pages/VisitUs';
import CustomerCare from '../pages/CustomerCare';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VerifyCode from '../pages/VerifyCode';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/lookbook' element={<Lookbook />} />
          <Route path='/visit-us' element={<VisitUs />} />
          <Route path='/customer-care' element={<CustomerCare />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/verify-code' element={<VerifyCode />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />

        <Route path='*' element={<Navigate to='/' />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;