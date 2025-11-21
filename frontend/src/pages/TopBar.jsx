import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
	const [open, setOpen] = useState(false);
	return (
		<header className="topbar">
			<nav className="topbar-links">
				<Link to="/about" className="nav-link">Home</Link>
				<div className="dropdown-projects" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
					<span>Projects  ▾</span>
					{open && (
						<div className="absolute translate-x-[-0.7rem] backdrop-blur-xl  px-2 py-4 w-25 flex flex-col border border-[#87a6ed] border-2 rounded-[2rem]">
							<Link to="/login" className="dropdown-item">Password Manager</Link>
						</div>
					)}
				
				</div>
			</nav>
		</header>
	);
}

export default TopBar;
