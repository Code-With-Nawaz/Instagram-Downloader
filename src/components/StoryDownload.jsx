import React, { useState } from 'react';

import { fetchInstagramVideo as fetchStoryV1 } from '../api1';
import { fetchInstagramVideo as fetchStoryV2 } from '../api2';

import { Helmet } from "react-helmet-async";

function StoryDownload() {
  const [url, setUrl] = useState('');
  const [storyData, setStoryData] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useVersion, setUseVersion] = useState(1);

  const extractUsername = (url) => {
    const urlParts = url.split('/');
    if (urlParts.length >= 4) {
      return urlParts[3];
    } else {
      return '';
    }
  };

  const handleDownload = async () => {
    setError('');
    setStoryData(null);
    setLoading(true);
    const extractedUsername = extractUsername(url);

    if (extractedUsername) {
      setUsername(extractedUsername);
    } else {
      setUsername('');
    }

    let data;
    if (useVersion === 1) {
      data = await fetchStoryV1(url);
    } else {
      data = await fetchStoryV2(url);
    }

    if (data.success) {
      setStoryData(data);
    } else {
      setError('Failed to fetch story. Please Try Again.');
    }

    setLoading(false);
  };

  const downloadStory = async () => {
    try {
      const response = await fetch(storyData.downloadUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:.]/g, '');
      const filename = `${username ? username + '_' : ''}instagram_story_${timestamp}.mp4`;
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      setError('Failed to download story. Please try again.');
    }
  };

  return (
    <>
    
    <Helmet>
        <title>Instagram Story Downloader - Save Stories</title>
        <meta name="description" content="Download Instagram stories, both images and videos, directly to your device." />
        <meta name="keywords" content="Instagram, Story Downloader, Save Instagram Stories, Download Stories" />
      </Helmet>
      <main className="flex-grow min-h-lvh flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="slide-in-left bg-white rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-md sm:max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">Instagram Story Downloader</h1>
        <p className="text-center text-gray-600 mb-6">Enter the Instagram story URL below to fetch and download the story.</p>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter Instagram Story URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-between mb-4 space-x-2">
          <button
            className={`w-full p-3 rounded-lg transition ${useVersion === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setUseVersion(1)}
          >
            Use Version 1
          </button>
          <button
            className={`w-full p-3 rounded-lg transition ${useVersion === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setUseVersion(2)}
          >
            Use Version 2
          </button>
        </div>
        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Story'}
        </button>

        {username && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">Username: <span className="font-bold text-blue-600">{username}</span></p>
          </div>
        )}

        {storyData && storyData.downloadUrl ? (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Story Preview:</h2>
            <video className="w-full rounded-lg shadow-md mb-4" controls>
              <source src={storyData.downloadUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={downloadStory}
              className="block w-full bg-green-500 text-white p-3 rounded-lg text-center hover:bg-green-600 transition"
            >
              Download Now
            </button>
          </div>
        ) : (
          error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )
        )}
      </div>
    </main>

    </>
    
  );
}

export default StoryDownload;
