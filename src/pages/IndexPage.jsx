import NavbarLoged from '../components/NavbarLoged.jsx';
import Footer from '../components/Footer.jsx';
import { MemberWelcome } from '../components/MemberWelcome.jsx';
import { ClassSchedule } from '../components/ClassSchedule.jsx';
import { MemberGoals } from '../components/MemberGoals.jsx';
import Payment from '../components/Payment.jsx';
import Gallery from '../components/Gallery.jsx';
import { useState, useEffect } from 'react';

const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem("auth_user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    const userId = user?.id_user;

    if (userId) {
      fetch(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 si usas JWT
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id_rol === 4) {
            setIsAdmin(true);
          }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, []);

export function IndexPage() {

  /*const [active, setActive] = useState('welcome') // 'welcome' | 'class' | 'goals'

  const content = active === 'welcome'
    ? <MemberWelcome />
    : active === 'class'
      ? <ClassSchedule />
      : <MemberGoals />

  return (
    <>
      <NavbarLoged onSelect={setActive} />
      <div className="main-content">
        {content}
      </div>
      <Footer />
    </>
  );
*/

  return (
    <>
      <NavbarLoged />
      <div className="main-content">
        <MemberWelcome />
        <ClassSchedule />
      </div>
      <Gallery isAdmin={isAdmin} />
      <Footer />
    </>
  );
}