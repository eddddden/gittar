import React, { useContext, useEffect, useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Home';
import Serch from './pages/BandsSearch';
import Home from './pages/Home';
import About from './pages/About'; // Import the About component
import './style.scss';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { auth } from './firebase';

// Import your logo image
import logoImage from './logo.jpeg';

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      // You might want to add a loading indicator or message here
      return <div>Loading...</div>;
    }

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <div className="nav">
        {/* Your navigation links */}
        <div className="nav-logo">
          {/* Use the imported logo image */}
          <img src={logoImage}  />
        </div>
        <div className="nav-menu">
          <ul>
            <li><Link to="/" className="link">Chats</Link></li>
            <li><Link to="/search" className="link">Search Professionals</Link></li>
            <li><Link to="/about" className="link">Home</Link></li>
            {/* Add more links as needed */}
          </ul>
        </div>
        {/* Additional elements like buttons */}
      </div>

      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<Serch />} />
          <Route path="chat" element={<Chat />} />
          <Route path="about" element={<About />} /> {/* Add the route for the About page */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
