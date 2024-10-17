import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">HealthDash</h3>
            <p className="text-sm">Empowering healthcare providers with efficient patient management tools.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-blue-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300">Patients</a></li>
              <li><a href="#" className="hover:text-blue-300">Prior Authorizations</a></li>
              <li><a href="#" className="hover:text-blue-300">Reports</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-md font-semibold mb-2">Contact</h4>
            <p className="text-sm">Email: support@healthdash.com</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-md font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2023 HealthDash. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> by HealthTech Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;