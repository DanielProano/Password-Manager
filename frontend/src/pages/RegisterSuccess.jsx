import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './RegisterSuccess.css';

function RegisterSuccess() {
   const navigation = useNavigate();

	return (
		<div className="title">
			<h1>Registration Success</h1>
         <div className="button">
            <button onClick={() => navigation("/Login")}>Return to Login</button>
         </div>   
		</div>
	);
};

export default RegisterSuccess;
