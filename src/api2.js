// src/api2.js
export const fetchInstagramVideo = async (videoUrl) => {
    const url = 'https://all-video-downloader1.p.rapidapi.com/Instagram';
    const data = new FormData();
    data.append('url', videoUrl);
  
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '34fe7a08d5mshb35d23913aab7ccp13997djsnda6fbdcf5c10',
        'x-rapidapi-host': 'all-video-downloader1.p.rapidapi.com'
      },
      body: data
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
  
      if (result.mediaURL && result.mediaURL.status) {
        const media = result.mediaURL.data[0];
        return { 
          success: true, 
          downloadUrl: media.url, 
          thumbnail: media.thumbnail 
        };
      } else {
        return { success: false, error: 'Failed to fetch video' };
      }
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: 'An error occurred while fetching the video' };
    }
  };
  