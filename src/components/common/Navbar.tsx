
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`navbar transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue">
            <div className="absolute h-3 w-3 rounded-full bg-brand-orange top-1 left-1"></div>
          </div>
          <span className="text-xl font-bold">agent.ai</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavItem to="/agents" label="Agent Network" active={location.pathname === '/agents'} />
          <NavItem to="/builder" label="Builder Network" active={location.pathname === '/builder'} />
          <NavItem to="/about" label="What Is This?" active={location.pathname === '/about'} />
          <NavItem to="/dashboard" label="Agent Builder" active={location.pathname === '/dashboard'} />
        </div>

        {/* User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center space-x-2 rounded-full bg-white p-1 pr-4 shadow-sm border border-gray-200">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User Profile" 
                className="h-full w-full object-cover" 
              />
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <MobileNavItem to="/agents" label="Agent Network" />
            <MobileNavItem to="/builder" label="Builder Network" />
            <MobileNavItem to="/about" label="What Is This?" />
            <MobileNavItem to="/dashboard" label="Agent Builder" />
            
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="User Profile" 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`relative font-medium text-sm transition-colors hover:text-primary ${
      active ? 'text-primary' : 'text-gray-700'
    }`}
  >
    {label}
    {active && (
      <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary" />
    )}
  </Link>
);

const MobileNavItem = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
  >
    {label}
  </Link>
);

export default Navbar;
