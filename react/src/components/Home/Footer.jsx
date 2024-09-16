
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mb-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Us */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              Career Craft is dedicated to helping job seekers find their dream jobs and employers find the best talent. Our platform offers a comprehensive job search experience with easy application processes and seamless interview scheduling.
            </p>
          </div>

          {/* Contact */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <ul className="text-sm">
              <li>Email: support@careercraft.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Career St, Jobtown, JT 12345</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                Instagram
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="text-sm">
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 py-4">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; 2024 Career Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
