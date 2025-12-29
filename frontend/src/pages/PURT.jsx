import './PURT.css';

function PURT() {
	return (
      <div>
         <div className="intro-page">
            <div className="intro">
               Doing corn tassel object detection from a drone using Machine Learning!
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
               <div className="how-step">
                  Test
               </div>
            </div>
         </div>
      </div>   
	);
};

export default PURT;
