import './HardwareHacking.css';
import Components from "../../assets/components.jpeg";
import Chip from "../../assets/chip.jpeg";
import Network from "../../assets/networking.jpeg";
import SmartCard from "../../assets/smart_card.jpeg";
import Pi from "../../assets/Pi.jpeg";

function HardwareHacking() {
   return (
      <div className="hh">
         <div className="intro-page">
            <img className="front-image" src={SmartCard}></img>
            <div className="intro">
               Hardware Hacking into a 2002 Smart Card Reader
            </div>
            <div className="author">
               By Daniel Proano, in collaboration with ChainVisor, a Purdue Cybersecurity Research Team under Professor Santiago Torres-Arias.
            </div>
         </div>  
         <div className="content-page">
            <div className="why">
               Why are we attacking an old card reader?
            </div>
            <div className="why-answered">
               The goal of ChainVisor is to investigate and discover supply chain vulnerabilities. We chose to look at the 2002 Smart Card Reader because its technologies are still in widespread use today and it was a good real-world example.
            </div>
            <div className="how">
               How did we approach this problem?
            </div>
            <div className="how-answered">
               <div className="how-step">
                  We first needed to understand the innerworkings of the device itself. We started by carefully removing the plastic shell, unearthing a small mess of wires and chip.
               </div>
               <img src={Chip}/>
               <div className="how-step">
                  We then took the board to Purdue's ECE shop and analyzed the chip. On it, we discovered:
               </div>
               <div className="how-step">
                  After thoroughly analzying the board, we then decided to attempt to communicate and exploit it. We decided to attack the board's debug port we found, hoping that we could ultimately gain control of the board through it.
               </div>
               <img src={Pi}/>
               <div className="how-step">
                  To connect to the debug port, we need a few things. The first is a way to talk to the board and port, which was accomplished via hand soldered wires. Next, we needed an OS to consistently communicate over these wired connections. So we decided to flash and setup a Rubic PI, my first ever opporuntity to work with PIs!
               </div>
               <img src={Components}/>
               <div className="how-step">
                  Dealing with the PI was a real pain, as interesting as it was. We ran into several problems during the PI setup, including the burnout of the memory card, networking permission issues due to Purdue IT department, and problems establishing connection to the WI-FI from the PI.
               </div> 
               <div className="how-step">
                  Despite these frustrations, we powered through until we had a working PI and teaching me a lot about GPIO pins and PIs in the process.
               </div>
               <img src={Network}/>
               <div className="how-step">
                  Finally, we were able to connect to the PI and begin hitting the Smart Card's debug port, looking for the password that would allow us.
               </div>  
            </div>
         </div>
      </div>   
   );
}

export default HardwareHacking;
