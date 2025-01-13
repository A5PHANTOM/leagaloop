import React,{useState} from 'react'
import "./NavBar.css"
function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

  return (
    <div className='navbar'>
      <a href='/'>
      <img className='logo' src="/src/assets/Legaloop.webp" alt="Legaloop Logo" />
      </a>
      <div className='nav-options'>
        <a href="/About">About</a>
        <a href="/Terms">Research</a>
        <a href="#booking">Booking</a>
        <a href="#company">Company</a>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    
      <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>
        <a href="/About" onClick={toggleMenu}>About</a>
        <a href="#research" onClick={toggleMenu}>Research</a>
        <a href="#booking" onClick={toggleMenu}>Booking</a>
        <a href="#company" onClick={toggleMenu}>Company</a>
      </div>
    </div>

  )
}

export default NavBar
