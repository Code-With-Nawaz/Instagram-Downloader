import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-600 shadow-md z-10 relative">
      <div className="container mx-auto px-4 py-8 text-white text-center">
        <p className="text-lg font-semibold mb-4">&copy; 2024 InstaDownloader. All rights reserved.</p>
        <p className="text-sm sm:text-base">
          Follow us on{' '}
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Instagram</a>,{' '}
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Twitter</a>, and{' '}
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Facebook</a>.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
