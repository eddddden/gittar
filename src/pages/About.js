import React from 'react';
import gitterImage from '../img/gitter.jpg';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AboutMe = () => {
  return (
    <div className="about">
      <div className="aboutBackground">
        <img src={gitterImage} alt="Background" />
      </div>
      <div className="aboutContent">
        <h2>StringVibesChat <br/>Harmonizing Musicians and Clients, One Chat at a Time!</h2>
        <p>
        Introducing our innovative chat platform designed exclusively for musicians and bands. Whether you're a talented musician looking to join a band or a band seeking new members, our platform is your ultimate destination. We specialize in connecting musicians and bands with clients in search of the perfect musical act for their events, creating harmony between talent and opportunity. Our unique search system empowers you to find the ideal band tailored to your preferences, with precise filters for genres and more. Say goodbye to the endless search and let us simplify the way you discover and collaborate with fellow musicians. Join us today and unlock a world of musical possibilities, where your next gig or band member is just a chat away.
        </p>
      </div>
      <div className="add">
        <p>
        for quality control and validation reasons, in order to add yourself as a musician/band to our database and be able to be searchable:
       <br/>
        1. Search for username "Eden" in the chat (- that's the site's manager. )
        <br/>
        2. Write in the chat all of your relevant categories such as - genre, instruments included in your band, covers/original songs, ect.
        <br/>
        3. Add a video link to some of your work (mendatory).
        <br/>
        4. If we will find your content legitimate, your band will be a part of our database and our search system within 2 buisness days.
        <br/> 
        <br/> 
        <br/> 
        
        If Youre a client looking for a band - Go to our customed search system to start finding your ultimate band!
      
        </p>
        <Link to="/search" className="searchButton">
        Go to Search
      </Link>
      </div>
    </div>
  );
};

export default AboutMe;
