// src/api/instainfoapi.js
const API_URL = 'https://rocketapi-for-instagram.p.rapidapi.com/instagram/user/get_info';

const fetchInstagramUserData = async (username) => {
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '34fe7a08d5mshb35d23913aab7ccp13997djsnda6fbdcf5c10',
      'x-rapidapi-host': 'rocketapi-for-instagram.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username }) // Convert body to JSON string
  };

  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }
    const data = await response.json();
    console.log(data);
    
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching Instagram user data:', error);
    return { success: false, error: error.message };
  }
};

export { fetchInstagramUserData };
