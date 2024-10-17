import {Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';


const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen"> {/* Full screen height */}
        <Navbar />
        <main className="flex-grow"> {/* Main content will grow and push footer to bottom */}
          <Outlet /> {/* This renders the child routes */}
        </main>
        <Footer /> {/* Footer will be sticky at the bottom */}
      </div>
    );
  };

export default Layout;