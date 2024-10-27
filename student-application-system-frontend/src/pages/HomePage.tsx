import Layout from '../components/layout/Layout';
import Profile from '../components/Profile';
import useUserStore from '../store/useUserStore';
import '../styles/homepage.css';
const HomePage = () => {
  const { user } = useUserStore();

  return (
    <Layout>
      <div className="homepage">
        <h1>WELCOME TO THE E-PORTAL</h1>
        <div className="home_user-details">
          <h2>Profile</h2>
          <Profile id={user?.id} user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
