// src/api1.js
export const fetchInstagramVideo = async (videoUrl) => {
    const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(videoUrl)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '34fe7a08d5mshb35d23913aab7ccp13997djsnda6fbdcf5c10',
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(apiUrl, options);
      const result = await response.json();
  
      if (!result.error) {
        return { 
          success: true, 
          downloadUrl: result.download_url, 
          caption: result.caption, 
          thumb: result.thumb 
        };
      } else {
        return { success: false, error: 'Failed to fetch video' };
      }
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: 'An error occurred while fetching the video' };
    }
  };
  