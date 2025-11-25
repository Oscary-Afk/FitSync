import NavbarLoged from '../components/NavbarLoged.jsx';
import Footer from '../components/Footer.jsx';
import { MemberWelcome } from '../components/MemberWelcome.jsx';
import { ClassSchedule } from '../components/ClassSchedule.jsx';
import { MemberGoals } from '../components/MemberGoals.jsx';
import Payment from '../components/Payment.jsx';
import Gallery from '../components/Gallery.jsx';

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
        <MemberGoals />
      </div>
      <Payment />
      <Gallery />
      <Footer />
    </>
  );
}