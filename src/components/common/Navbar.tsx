
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, LogOut } from 'lucide-react';
import { 
  SignedIn,
  SignedOut, 
  useUser,
  useClerk 
} from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();

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
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 rounded-full bg-white p-1 pr-4 shadow-sm border border-gray-200">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    {user?.imageUrl ? (
                      <img 
                        src={user.imageUrl} 
                        alt={`${user.firstName}'s profile`} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary text-white">
                        {user?.firstName?.[0]}
                      </div>
                    )}
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {user?.firstName} {user?.lastName}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="mr-4 flex items-center space-x-2 rounded-full bg-white p-1 shadow-sm border border-gray-200">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    {user?.imageUrl ? (
                      <img 
                        src={user.imageUrl} 
                        alt={`${user.firstName}'s profile`} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary text-white">
                        {user?.firstName?.[0]}
                      </div>
                    )}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {user?.firstName} {user?.lastName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <button className="ml-auto" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <MobileNavItem to="/agents" label="Agent Network" />
            <MobileNavItem to="/builder" label="Builder Network" />
            <MobileNavItem to="/about" label="What Is This?" />
            <MobileNavItem to="/dashboard" label="Agent Builder" />
            
            <SignedOut>
              <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
                <Button variant="outline" asChild className="w-full justify-center">
                  <Link to="/signin">Sign in</Link>
                </Button>
                <Button asChild className="w-full justify-center">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            </SignedOut>
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
