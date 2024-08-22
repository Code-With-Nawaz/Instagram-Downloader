import React, { useState } from 'react';
import { fetchInstagramVideo as fetchVideoV1 } from '../api1';
import { fetchInstagramVideo as fetchVideoV2 } from '../api2';

function InstagramReelDownload() {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useVersion, setUseVersion] = useState(1);

  const extractUsername = (url) => {
    const urlParts = url.split('/');
    if (urlParts.length >= 4 && urlParts[3] !== 'reel') {
      return urlParts[3];
    } else {
      return '';
    }
  };

  const handleDownload = async () => {
    setError('');
    setVideoData(null);
    setLoading(true);
    const extractedUsername = extractUsername(url);

    if (extractedUsername) {
      setUsername(extractedUsername);
    } else {
      setUsername('');
    }

    let data;
    if (useVersion === 1) {
      data = await fetchVideoV1(url);
    } else {
      data = await fetchVideoV2(url);
    }

    if (data.success) {
      setVideoData(data);
    } else {
      setError('Failed to fetch video. Please Try Again.');
    }

    setLoading(false);
  };

  const downloadVideo = async () => {
    try {
      const response = await fetch(videoData.downloadUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:.]/g, '');
      const filename = `${username ? username + '_' : ''}instagram_video_${timestamp}.mp4`;
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      setError('Failed to download video. Please try again.');
    }
  };

  return (
    <main className="flex-grow min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800">
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-2xl w-full max-w-md sm:max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-900">Instagram Video Downloader</h1>
        <p className="text-center text-gray-600 mb-6">Enter the Instagram video URL below to fetch and download the video.</p>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
          placeholder="Enter Instagram Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-between mb-4 space-x-2">
          <button
            className={`w-full p-4 rounded-lg transition ${useVersion === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setUseVersion(1)}
          >
            Use Version 1
          </button>
          <button
            className={`w-full p-4 rounded-lg transition ${useVersion === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setUseVersion(2)}
          >
            Use Version 2
          </button>
        </div>
        <button
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Video'}
        </button>

        {username && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">Username: <span className="font-bold text-blue-600">{username}</span></p>
          </div>
        )}

        {videoData && videoData.downloadUrl ? (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Video Preview:</h2>
            <video className="w-full rounded-lg shadow-lg mb-4" controls>
              <source src={videoData.downloadUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={downloadVideo}
              className="block w-full bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition"
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
  );
}

export default InstagramReelDownload;
