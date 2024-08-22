import React, { useState } from "react";
import { fetchInstagramUserData } from "./api/instainfoapi";

function DpDownload() {
  const [input, setInput] = useState(""); // Combined input for URL or username
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [profileName, setProfileName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractUsernameFromUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.length >= 4 ? urlParts[3] : "";
  };

  const handleDownload = async () => {
    setError("");
    setProfilePicUrl("");
    setProfileName("");
    setLoading(true);

    const usernameToSearch = input.startsWith("https://") 
      ? extractUsernameFromUrl(input)
      : input;

    if (usernameToSearch) {
      setUsername(usernameToSearch);
      try {
        const { success, data, error: apiError } = await fetchInstagramUserData(usernameToSearch);
        if (success) {
          const user = data.response.body.data.user || {};
          setProfilePicUrl(user.profile_pic_url_hd || user.profile_pic_url || "");
          setProfileName(user.full_name || "No name available");
        } else {
          setError(apiError || "Failed to fetch profile picture.");
        }
      } catch (err) {
        setError("Error fetching profile picture: " + err.message);
      }
    } else {
      setError("Invalid input. Please provide a valid username or profile URL.");
    }

    setLoading(false);
  };

  const downloadProfilePic = () => {
    if (profilePicUrl) {
      try {
        const link = document.createElement("a");
        link.href = profilePicUrl;
        link.target = "_blank"; // Open in a new tab
        link.download = `${username ? username + "_" : ""}instagram_profile_pic_hd.jpg`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        setError("Failed to download profile picture: " + err.message);
      }
    } else {
      setError("No profile picture URL available.");
    }
  };

  return (
    <main className="flex-grow min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700">
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-md sm:max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Instagram Profile Picture Downloader
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the Instagram username or profile URL below to fetch and download the HD profile picture.
        </p>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Enter Instagram Username or Profile URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Profile Picture"}
        </button>

        {profilePicUrl && profileName && (
          <div className="mt-6">
            <div className="flex items-center justify-center mb-4">
              <img
                className="w-32 h-32 rounded-full shadow-lg"
                src={profilePicUrl}
                alt="Instagram Profile Picture"
              />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-800">
              {profileName}
            </h2>
            <button
              onClick={downloadProfilePic}
              className="block w-full bg-purple-500 text-white p-3 rounded-lg text-center hover:bg-purple-600 transition mt-4"
            >
              Download Profile Picture
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </main>
  );
}

export default DpDownload;
