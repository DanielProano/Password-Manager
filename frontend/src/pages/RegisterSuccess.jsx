import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterSuccess() {
   const navigation = useNavigate();

	return (
		<div className="flex flex-col justify-center items-center mt-80 text-2xl">
			<h1>Registration Success</h1>
         <div className="mt-20">
            <button onClick={() => navigation("/Login")}>Return to Login</button>
         </div>   
		</div>
	);
};

export default RegisterSuccess;
