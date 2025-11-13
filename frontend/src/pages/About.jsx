import { useState } from "react";
import Danny_pfp from '../assets/Danny_pfp.JPG';
import "./About.css";

function About() {
	return (
		<div>
         <div id="Profile-Header">
            <img src={Danny_pfp} alt="Danny's Image" />
         </div>
			<h2 className="underline">About Page</h2>
		</div>
	);
};

export default About;
