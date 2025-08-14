
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <p className="mt-2 text-sm">Designed with ❤️ by Harsimran</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-400 transition-colors duration-300">Privacy Policy</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-gray-400 transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;