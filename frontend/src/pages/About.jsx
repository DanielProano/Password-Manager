import { useState, useEffect } from "react";
import Daniel_pfp from '../assets/Daniel_pfp.JPG';
import PassPhoto from '../assets/PasswordManagerPhoto.png';
import MusicPhoto from '../assets/MergedScale.png';
import CryptoPhoto from '../assets/EnigmaMachine.png';
import TasselPhoto from '../assets/tassels.png';
import config from "../config.json";
import "./About.css";

const projects = [
   {
      title: "A Modern Zero-Knowledge Password Manager",
      description: "A traditional password manager can leak your passwords, but not a Zero-Knowledge service. By its nature, this security focused architecture does not know your master password and protects user data even if it is compromised",
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
      description: "Farmers need to keep their corn pure to get the best produce genetics. Therefore, it is critical that corn tassels are collected and removed from the field. Teaming with Purdue's UAV research team, I made over 30 different YOLOv8 tassel detection models for real time identification on our drone",
      image: TasselPhoto,
      link: "https://github.com/DanielProano/ChessBot_ML"
   },
   {
      title: "Musical inversion with Python",
      description: "Ambidexterity is a hard skill to learn for beginner piano players, which is why my Akron startup internship in the Summer of 2025 had me developing symmetrical musical inversion algorithms",
      image: MusicPhoto,
      link: "https://github.com/DanielProano/Lilypond-Parser"
   },
   {
      title: "History of cryptography",
      description: "I recreated histories most famous ciphers and encryption algorithms, starting with the Caesar cipher and working up to the Enigma Machine",
      image: CryptoPhoto,
      link: "https://github.com/DanielProano/Cryptography"
   }
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
               A Purdue Computer Science Student at the intersection of cybersecurity and software engineering
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
      </div>
   );
}

export default About;
