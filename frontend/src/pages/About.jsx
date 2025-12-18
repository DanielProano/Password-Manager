import { useState } from "react";
import Daniel_pfp from '../assets/Daniel_pfp.JPG';
import config from "../config.json";

function About() {
   const [activeSection, setActiveSection] = useState(null);

   const experience = [
      {
         title: "Kundalini Software Internship",
         year: "2025",
         description: "Developed code to read and symmetrically invert music in the Lilypond format for a company in Akron"
      },
      {
         title: "PURT - UAV Research",
         year: "2025",
         description: "Working in Purdue's world-class indoor research laboratory for UAV research, creating 30+ machine learning models using YOLOv8 for revolutionary object detection in agriculture"
      },
      {
         title: "ChainVisor Research",
         year: "2025",
         description: "Semester-long Purdue Research Team finding vulnerabilities in IoT devices. Dissected, exploited, and took control of a Smart Card Reader from 2001"
      },
      {
         title: "Eagle Scout Project",
         year: "2024",
         description: "Led 30+ volunteers to restore and rebuild a local dog shelter's 11-foot road sign, including design, construction, and landscaping"
      }
   ];

   const skills = {
      "Languages/Frameworks": "Rust, Python, C/C++, React, Java, Bash, HTML/CSS/JavaScript",
      "Tools": "Git, Wireshark, Ghidra, Docker, Ubuntu/Linux, AWS, Neovim",
      "Creative": "Blender, Maya"
   };

   const [out, setOut] = useState('');

   async function test() {
      const t = await fetch(`${config.backend}/api/hello`);  
      const text = await t.text();  
      setOut(text);                          
      console.log(text);                 
   }
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
         <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
               <div className="relative inline-block mb-6">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <img 
                      src={Daniel_pfp}
                      alt="Danny's profile"
                      className="w-full h-full rounded-full object-cover"
                    />            
                  </div>
               </div>
               <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
               Hi, I'm Danny!
               </h1>
               <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
               Purdue Computer Science student at the intersection of Software Engineering and Cybersecurity
               </p>
            </div>
         <button onClick={test}> Button</button>
         {out} 

         {/* About */}
         <section className="mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
               <p className="text-lg text-slate-300 leading-relaxed mb-4">
                  I compete in CTFs, develop software for Purdue's Electrical Racing Team and Autonomous Racing Team, 
                  and build machine learning applications for Purdue's UAV research team. I also like to do malware 
                  analysis in my free time!
               </p>
               <p className="text-lg text-slate-300 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Double Major:</span> Computer Science (Software Engineering & Cybersecurity) + Mathematics
               </p>
            </div>
         </section>

         {/* Experience */}
         <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-100">Experience</h2>
            <div className="space-y-4">
            {experience.map((exp, idx) => (
               <div 
                  key={idx}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveSection(activeSection === idx ? null : idx)}>
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-semibold text-blue-400">{exp.title}</h3>
                     <span className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">{exp.year}</span>
                  </div>
                  <p className={`text-slate-300 leading-relaxed transition-all duration-300 ${
                  activeSection === idx ? 'opacity-100 max-h-40' : 'opacity-70 max-h-20 line-clamp-2'}`}>
                     {exp.description}
                  </p>
               </div>
            ))}
            </div>
         </section>

         {/* Technical Skills */}
         <section>
         <h2 className="text-3xl font-bold mb-6 text-slate-100">Technical Skills</h2>
         <div className="grid gap-4">
            {Object.entries(skills).map(([category, items], idx) => (
               <div 
                key={idx}
                className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">{category}</h3>
                <p className="text-slate-300 leading-relaxed">{items}</p>
               </div>
            ))}
         </div>
         </section>
         </div>
      </div>
   );
}

export default About;
