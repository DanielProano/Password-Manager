import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
	const [open, setOpen] = useState(false);
	return (
		<header className="topbar">
			<nav className="topbar-links">
				<Link to="/" className="nav-link">Home</Link>
				<Link to="/about" className="nav-link">About</Link>
				<Link to="/blog" className="nav-link">Blog</Link>
				<div className="dropdown-projects" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
					<span>Projects  ▾</span>
					{open && (
						<div className="dropdown-menu">
							<Link to="/login" className="dropdown-item">Password Manager</Link>
							<Link to="/virus" className="dropdown-item">Virus Research</Link>
							<Link to="/music" className="dropdown-item">Music</Link>
							<Link to="/notes" className="dropdown-item">Notes</Link>
						</div>
					)}
				
				</div>
			</nav>
		</header>
	);
}

export default TopBar;
