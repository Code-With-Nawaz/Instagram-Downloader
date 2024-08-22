import React, { useState } from 'react';
import { fetchInstagramUserData } from './api/instainfoapi';

function InstagramUserInfo() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setError('');
    setUserData(null);
    setLoading(true);

    try {
      const { success, data, error: apiError } = await fetchInstagramUserData(username);

      if (success) {
        console.log('Fetched user data:', data); // Debugging line

        setUserData(data.response.body.data.user); // Update to match API response structure

        console.log(userData);
        
        
      } else {
        setError(apiError || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error:', error); // Debugging line
      setError('An error occurred while fetching user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800">
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-2xl w-full max-w-md sm:max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-900">Instagram User Info</h1>
        <p className="text-center text-gray-600 mb-6">Enter the Instagram username below to fetch user information.</p>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
          placeholder="Enter Instagram Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
          onClick={handleFetchData}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch User Info'}
        </button>

        {userData ? (
          <div className="mt-6 text-center">
            <img
  src={userData.profile_pic_url_hd}
  alt="Profile Picture"
  className="w-32 h-32 rounded-full mx-auto mb-4"
  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback image
  onLoad={() => console.log('Image loaded successfully')}
 />

            <h2 className="text-2xl font-semibold text-gray-800">{userData.username}</h2>
            <p className="text-lg text-gray-600">{userData.full_name}</p>
            <p className="text-md text-gray-500 mt-2">{userData.biography}</p>
            <p className="text-md text-gray-500 mt-2">Category: {userData.category_name || 'Not available'}</p>
            <p className="text-md text-gray-500 mt-2">
            Bio Links: 
            {userData.bio_links.length > 0
              ? userData.bio_links.map((link, index) => (
                  <span key={index}>
                    {link.url ? (
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {link.url}
                      </a>
                    ) : (
                      'No URL'
                    )}
                    {index < userData.bio_links.length - 1 ? ', ' : ''}
                  </span>
                ))
              : 'None'}
          </p>
            <p className="text-md text-gray-500 mt-2">Statistics: 
              {userData.edge_followed_by ? `Followers: ${userData.edge_followed_by.count}` : 'No data'}
              {userData.edge_follow ? ` | Following: ${userData.edge_follow.count}` : ''}
            </p>
            <p className="text-md text-gray-500 mt-2">Social Links: {userData.connected_fb_page ? userData.connected_fb_page : 'None'}</p>
            <p className="text-md text-gray-500 mt-2">About: {userData.biography || 'Not available'}</p>
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

export default InstagramUserInfo;
