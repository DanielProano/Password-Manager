import { useState } from "react";
import Daniel_pfp from '../assets/Daniel_pfp.JPG';

function About() {
	return (
		<div>
         <div id="Profile-Header">
            <img src={Daniel_pfp} className="mx-auto mt-5 w-[500px] h-[600px] rounded-full" alt="Danny's Image" />
         </div>
			<h2 className="absolute top-40">About Page</h2>
		</div>
	);
};

export default About;
