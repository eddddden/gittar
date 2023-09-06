import React, { useState } from 'react';
import addAvatar from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore"; 
import { auth, storage, db } from "../firebase";
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const userUID = res.user.uid;
      
      // Sanitize the displayName for use in storage reference
      const sanitizedDisplayName = displayName.replace(/\s+/g, '_').toLowerCase();
      const storageRef = ref(storage, sanitizedDisplayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.error('Firestore Error:', error.message);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      // console.error('Firestore Error:', error.message);
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formRaper'>
        <span className='logo'>StringVibesChat</span>
        <span className='title'>Register Page</span> 
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='display name'/>
          <input type='email' placeholder='email '/>
          <input type='password' placeholder='password'/>
          <input style={{ display: "none" }} type='file' id='file'/>
          <label htmlFor='file' className='avatarLabel'>
            <img src={addAvatar} alt='' className='avatarImage' />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Error</span>}
        </form>
        <p>You don't have an account? <Link to='/login'>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Register;
