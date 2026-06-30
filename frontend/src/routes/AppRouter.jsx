import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop';
import CustomerCare from '../pages/CustomerCare';
import Lookbook from '../pages/Lookbook';
import VisitUs from '../pages/VisitUs';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/customer-care' element={<CustomerCare />} />
          <Route path='/lookbook' element={<Lookbook />} />
          <Route path='/visit-us' element={<VisitUs />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
