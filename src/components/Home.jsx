// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
     <Helmet>
        <title>Instagram Reel Downloader - Fast and Easy</title>
        <meta name="description" content="Download Instagram Reels quickly and easily with our free online tool." />
        <meta name="keywords" content="Instagram, Reel, Downloader, Video Download, Instagram Reel" />
      </Helmet>
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500">
      <div className="slide-in-bottom  bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to the Instagram Downloader App</h2>
        <p className="text-center text-gray-600 mb-6">Choose a feature to get started:</p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/instagram-reel-download"
            className="block bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Instagram Reel Download
          </Link>
          
          <Link
            to="/story-download"
            className="block bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Story Download
          </Link>
          <Link
            to="/post-download"
            className="block bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Post Download
          </Link>
          <Link
            to="/profile-picture-download"
            className="block bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Profile Picture Download
          </Link>
          <Link
            to="/instagram-information"
            className="block bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition transform hover:scale-105"
          >
            Instagram Information
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
