import React from 'react';
import addAvatar from '../img/addAvatar.png';
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  
  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
        <div className='formRaper'>
            <span className='logo'>StringVibesChat</span>
            <span className='title'>Login Page</span> 
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='email '/>
                <input type='password' placeholder='password'/>
                <button>Sign In</button>
                {err && <span>Error</span>}

            </form>
            <p>You don't have account? <Link to='/register'>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default  Login;