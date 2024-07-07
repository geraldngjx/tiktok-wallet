"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Favorite, Comment, Share } from "@mui/icons-material";

interface VideoData {
  id: string;
  videoUrl: string;
  username: string;
  caption: string;
  songName: string;
  profilePhoto: string;
  likes: string[];
  commentCount: number;
  shareCount: number;
}

const mockVideoList: VideoData[] = [
  {
    id: "1",
    videoUrl:
      "https://pldphpgxyiuevonrkpas.supabase.co/storage/v1/object/public/shopitem/typo_1.mp4",
    username: "user1",
    caption: "Sample caption",
    songName: "Sample Song",
    profilePhoto: "/sample_profile.jpg",
    likes: [],
    commentCount: 10,
    shareCount: 5,
  },
];

const getCurrentUserId = () => "currentUserId";

export default function VideoScreen() {
  const [videoState, setVideoState] = useState({
    currentVideoIndex: 0,
    videos: mockVideoList,
  });
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const videoData = videoState.videos[videoState.currentVideoIndex];
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    // Disable scrolling on body and html
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Ensure the container takes up full viewport height
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    // Cleanup function to re-enable scrolling
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";
    };
  }, []);

  const handleLike = (id: string) => {
    setVideoState((prevState) => {
      const updatedVideos = prevState.videos.map((video) => {
        if (video.id === id) {
          const hasLiked = video.likes.includes(currentUserId);
          const newLikes = hasLiked
            ? video.likes.filter((like) => like !== currentUserId)
            : [...video.likes, currentUserId];

          return {
            ...video,
            likes: newLikes,
          };
        }
        return video;
      });

      return {
        ...prevState,
        videos: updatedVideos,
      };
    });
  };

  const isLiked = videoData.likes.includes(currentUserId);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {hasWindow && (
        <ReactPlayer
          url={videoData.videoUrl}
          playing
          loop
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex flex-col justify-end h-full">
          <div className="flex items-end justify-between">
            {/* Temporarily set margin bottom 20px to avoid overlap with bottom nav */}
            <div className="flex-1 space-y-4 mb-20">
              <div className="text-white font-bold text-2xl">
                {videoData.username}
              </div>
              <div className="flex items-center text-white text-base">
                {videoData.caption}
              </div>
              <div className="flex items-center text-white text-base">
                <span className="mr-2">🎵</span>
                {videoData.songName}
              </div>
            </div>
            {/* Temporarily set margin bottom 20px to avoid overlap with bottom nav */}
            <div className="w-24 flex flex-col items-center space-y-6 mb-20">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={videoData.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col items-center space-y-1">
                <button onClick={() => handleLike(videoData.id)}>
                  <Favorite
                    className={`w-10 h-10 ${
                      isLiked ? "text-red-500" : "text-white"
                    }`}
                  />
                </button>
                <span className="text-xl">{videoData.likes.length}</span>
              </div>
              <div className="text-white flex flex-col items-center space-y-1">
                <button>
                  <Comment className="w-10 h-10" />
                </button>
                <span className="text-xl">{videoData.commentCount}</span>
              </div>
              <div className="text-white flex flex-col items-center space-y-1">
                <button>
                  <Share className="w-10 h-10" />
                </button>
                <span className="text-xl">{videoData.shareCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
