import GroupPhoto from '../../assets/group.jpeg';
import AbovePhoto from '../../assets/above_group.jpeg';
import DronePhoto from '../../assets/drone.jpeg';
import CornPhoto from '../../assets/corn.png';
import GraphsPhoto from '../../assets/graphs.jpeg';
import HandheldPhoto from '../../assets/handheld_drone.jpeg';
import LocationPhoto from '../../assets/location.jpeg';
import DetectPhoto from '../../assets/tassel_detection.png';
import AnnotatePhoto from '../../assets/tassel_annotations.png';
import DroneVideo from '../../assets/flight.mp4';

import './PURT.css';

function Purt() {
	return (
      <div className="purt">
         <div className="intro-page">
            <img className="front-image" src={CornPhoto}></img>
            <div className="intro">
               My experience doing Machine Learning object detection on drones
            </div>
            <div className="author">
               By Daniel Proano, in collaboration with PURT, Purdue's UAV research team under Professor Goppert
            </div>
         </div>
         <div className="content-page">
            <div className="why">
               Why do we need a drone capabable of tassel detection?
            </div>
            <div className="why-answered">
               Farmers need pure corn to breed the best corn genetics, but with their current tools, only 85% of corn tassels are successfully harvested. The current solution is to hire a bunch of teenagers for three weeks in the summer to collect the leftover tassels, having them aimlessly wonder the fields. Our solution is have a drone capable of tassel detection create a heat map of the field for farmers, making their jobs easier.
            </div>
            <div className="how">
               How did PURT and I accomplish this?
            </div>  
            <div className="how-answered">
               <img src={GroupPhoto}></img>
               <div className="how-step">
                  When I was introduced to the team, I was nearly the only software individual amongst a sea of hardware and mechanical specialists. Having some machine learning experience, I was put in charge of developing our machine learning model for object detection. Therefore, I had several critical decisions to make. 
               </div>
               <img src={HandheldPhoto}></img>
               <div className="how-step">
                  I did a lot of research into the best way to go about object detection. My decision was also influenced by the team's desire to do real time object detection. I eventually landed on YOLOv8 small model, finding its performance to be the best in relation to our needs.
               </div>
               <div className="how-step">
                  The next step was getting a dataset to train off of. We needed a large collection of corn tassels to train out model. Luckily, there are several of the these datasets available for free on the internet!
               </div>
               <img src={AnnotatePhoto}></img>
               <div className="how-step">
                  Next came the most tedious step: hand labeling the images. Of which, there were many, usually with dozens per image. Thankfully, with the help of PURT, we were able to create a usable dataset in no time and our model could begin training!
               </div>
               <img src={GraphsPhoto}></img>
               <div className="how-step">
                  Now, the real fun began. I spent my fall break off Purdue creating over thirty different YOLOv8 models, fine tuning our photo pre-processing and model parameters until out model achieved over 60% accurarcy, recall, and precision across the board!
               </div>
               <img src={LocationPhoto}></img>
               <div className="how-step">
                  There were quite a few challenges we had to overcome in the process, including a buggy GPS as you can see from the photo above.
               </div>
               <img src={DetectPhoto}></img>
               <div className="how-step">
                  With the hardwork done, it was finally time for testing. The hardware team had been hard at work getting the drone fully functional and the drone camera setup properly. We took our drone to PURT's world class UAV testing facility and began recording as the drone flew over our makeshift corn tassels.
               </div>
               <div className="how-step">
                  Later, I took the video and ran our model, producing extremely promising results that I was extremely delighted to see! You can see for yourself below!
               </div>
               <video
                 src={DroneVideo}
                 controls
                 muted
                 loop
               ></video>
               <div className="how-step">
                  Thank you to PURT for enabling this research, allowing me to focus on experimenting and implementing object detection while they focused on the hardware abilities of the drone!
               </div>   
            </div>
         </div>
      </div>   
	);
};

export default Purt;
