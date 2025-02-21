// src/pages/home-page/HomePage.js
import React, { useState } from 'react';
import './homePage.css'; // Import CSS for HomePage
import Navbar from '../../components/navbar/home-navbar/Navbar';
import Sidebar from '../../components/navbar/home-sidebar/Sidebar';
import GoalsForm from '../../components/forms/goals-form/GoalsForm';

const HomePage = () => {
  const [selectedLink, setSelectedLink] = useState('goals');

  const handleLinkClick = (link) => {
      setSelectedLink(link);
  };

  return (
    <div className="home-page">
      <Navbar></Navbar>

      <Sidebar selectedLink={selectedLink} onLinkClick={handleLinkClick} />

      <div className='content'>
        {selectedLink === 'goals' && <GoalsForm />}
      </div>
    </div>
  );
};

export default HomePage;
