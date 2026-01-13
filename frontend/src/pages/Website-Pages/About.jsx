import { useState, useEffect } from "react";
import Daniel_pfp from '../../assets/Daniel_pfp.JPG';
import PassPhoto from '../../assets/PasswordManagerPhoto.png';
import MusicPhoto from '../../assets/MergedScale.png';
import CryptoPhoto from '../../assets/EnigmaMachine.png';
import TasselPhoto from '../../assets/tassel_detection.png';
import SmartPhoto from '../../assets/smart_card.jpeg';
import config from "../../config.json";
import "./About.css";

const projects = [
   {
      title: "A Modern Zero-Knowledge Password Manager",
      description: "A traditional password manager can leak your passwords, but not a Zero-Knowledge service! This security focused architecture does not know your master password and protects user data even if it is compromised",
      image: PassPhoto,
      link: "https://dannyproano.com/login"
   },
   {
      title: "An Evaluation ChessBot with ML",
      description: "Chess is complex and advantage is as much positional as it is material, so what better way to explore its intricacies than with an ML bot trained on 100 million different positions?",
      image: "",
      link: "https://github.com/DanielProano/ChessBot_ML"
   },
   {
      title: "Object Detection with Drones",
      description: "Farmers need to keep their corn pure for breeding so it is critical that corn tassels are collected and removed from the field. In collaboration with PURT, I made over 30 different YOLOv8 tassel detection models for real time identification on our drone",
      image: TasselPhoto,
      link: "https://dannyproano.com/Purt"
   },
   {
      title: "Hardware Hacking a 2002 Card Reader",
      description: "In collaboration with Purdue's ChainVisor research Team, I did research on how to exploit and take control over a 2002 Smart Card Reader using PIs and bruteforce",
      image: SmartPhoto,
      link: "https://dannyproano.com/HardwareHacking"
   },
   {
      title: "Musical inversion with Python",
      description: "Ambidexterity is a hard skill to learn for beginner piano players, which is why my Akron startup internship in the Summer of 2025 had me developing symmetrical music algorithms",
      image: MusicPhoto,
      link: "https://github.com/DanielProano/Lilypond-Parser"
   },
   {
      title: "History of cryptography",
      description: "I recreated histories most famous ciphers and encryption algorithms, starting with the Caesar cipher and working up to the Enigma Machine",
      image: CryptoPhoto,
      link: "https://github.com/DanielProano/Cryptography"
   },
]

const skills = [
   "Python",
   "C",
   "C++",
   "Java",
   "React",
   "R",
   "CSS/Tailwind",
   "Javascript",
   "Assembly (ARM)",
   "Linux",
   "Windows",
   "Ghidra",
   "Neovim",
   "VSCode",
   "Embedded",
   "PyTorch",
   "MatPlotLib"
]

async function Start() {
   try {
      await fetch(`${config.backend}/api/wakeup`);
   } catch(err) {
      console.log("Error: ", err);
   } 
}

function About() {
   useEffect(() => {
      Start();
   }, []);

   return (
      <div>
         <div className="intro-page">
            <img className="profile-pic" src={Daniel_pfp} alt="test"/>
            <div className="introduction">
               Hey! I'm Danny!
            </div>
            <div className="sub-introduction">
               A Purdue University Computer Science Student
            </div>
         </div>
         <div className="about-page">
            <div className="about-intro">
               Who am I?
            </div>
            <div className="about-container">
               Hi! I am a Computer Science and Mathematics double major at Purdue specializing in Systems Engineering and Cybersecurity. In my free time, I compete in cybersecurity, mathematical, and algorithmic competitions, and am involved with Purdue's Electric and Autonomous Racing Teams along with Purdue's Hacking Club.
            </div>
         </div>
         <div className="project-page">
            <div className="project-intro">
               What have I been working on?
            </div>
            <div className="project-container">
               {projects.map((project, index) => (
                  <div 
                     className="project-card" 
                     key={index} 
                     onClick={() => window.open(project.link, '_blank')
                  }>
                     <img src={project.image}/>
                     <div className="project-info">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="skills-page">
            <div className="skills-intro">
               What do I have experience in?
            </div>
            <div className="skills-container">
            {skills.map((skill, index) => (
                  <div key={index} className="skills-item">
                     {skill}
                  </div>
               ))}
            </div> 
         </div>
      </div>
   );
}

export default About;
