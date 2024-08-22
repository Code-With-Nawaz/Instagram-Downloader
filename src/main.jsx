import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import InstagramReelDownload from "./components/InstagramReelDownload.jsx";
import Home from "./components/Home.jsx";
import PostDownload from "./components/PostDownload.jsx";
import DpDownload from "./components/DpDownload.jsx";
import StoryDownload from "./components/StoryDownload.jsx";
import InstagramUserInfo from "./components/InstagramUserInfo.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/instagram-reel-download" element={<InstagramReelDownload />} />    
    <Route path="/post-download" element={<PostDownload />} />    
    <Route path="/dp-download" element={<DpDownload />} />    
    <Route path="/story-download" element={<StoryDownload />} />    
    <Route path="/instagram-information" element={<InstagramUserInfo />} />    
  </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
