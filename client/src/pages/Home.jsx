import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link className="display-large" to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default Home;
