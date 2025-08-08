import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

function SideBar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>

			<div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
				☰
			</div>

			<nav className="sidebar links">
				<Link to="/">Home {isOpen && 'Home'}</Link>
				<Link to="/blog">Blog {isOpen && 'Blog'}</Link>
				<Link to="/login">Password Manager {isOpen && 'Password Manager'}</Link>
			</nav>
		</div>
	);
}

export default SideBar;
