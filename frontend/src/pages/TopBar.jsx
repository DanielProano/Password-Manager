import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
	return (
		<header className="topbar">
			<nav className="topbar-links">
				<Link to="/" className="nav-link">Home</Link>
				<Link to="/about" className="nav-link">About</Link>
				<Link to="/blog" className="nav-link">Blog</Link>
				<Link to="/login" className="nav-link">Password Manager</Link>
				<Link to="/virus" className="nav-link">Virus Research</Link>
				<Link to="/music" className="nav-link">Music</Link>
			</nav>
		</header>
	);
}

export default TopBar;
