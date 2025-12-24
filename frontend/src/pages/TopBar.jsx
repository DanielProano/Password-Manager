import { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
   const [projectsIsOpen, setProjectsIsOpen] = useState(false);
   const [researchIsOpen, setResearchIsOpen] = useState(false);

	return (
		<header className="topbar">
         <Link to="/" className="topbar-link">Home</Link>
         <div className="dropdown" onMouseEnter={() => setProjectsIsOpen(true)} onMouseLeave={() => setProjectsIsOpen(false)}>
            <button onClick={() => setProjectsIsOpen(o => !o)} className="topbar-link">
               Projects  ▾
            </button>
            
            {projectsIsOpen && (
               <div className="dropdown-menu">
                  <Link to="/login" className="dropdown-item">
                     Password Manager
                  </Link>
               </div>  
            )}
         </div>

         <div className="dropdown" onMouseEnter={() => setResearchIsOpen(true)} onMouseLeave={() => setResearchIsOpen(false)}>
            <button onClick={() => setResearchIsOpen(o => !o)} className="topbar-link">
               Research  ▾
            </button>

            {researchIsOpen && (
               <div className="dropdown-menu">
                  <Link to="/HardwareHacking" className="dropdown-item">
                     Hardware Hacking
                  </Link> 
               </div>
            )}
         </div>  
         
         <a 
            href="https://github.com/DanielProano/DanielProano"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-link"
         >
            Github
         </a>
      </header>
	);
}

export default TopBar;
