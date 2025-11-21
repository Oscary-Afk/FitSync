import NavbarLoged from '../components/NavbarLoged.jsx';
import Footer from '../components/Footer.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Payment from '../components/Payment.jsx';

export function IndexPage() {
  return (
    <>
      <NavbarLoged />
      <Dashboard />
      <Payment />
      <Footer />
    </>
  );
}