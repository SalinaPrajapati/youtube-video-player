import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useAppSelector } from "../store";
import { useRouter } from "next/navigation";

interface PlaylistItem {
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

export default function Youtube() {
  const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";

  const router = useRouter();
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const fetchPlaylistItems = async () => {
    try {
      const playlistId = "YOUR_PLALIST_ID";
      const apiKey = "YOUR_API_KEY";

      const response = await axios.get(YOUTUBE_PLAYLIST_ITEMS_API, {
        params: {
          part: "snippet",
          playlistId: playlistId,
          key: apiKey,
          maxResults: 10,
        },
      });

      setPlaylistItems(response.data.items);
    } catch (error) {
      console.error("Error fetching playlist items:", error);
    }
  };

  const playVideoInNewTab = (videoId: string) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, "_blank");
  };
  const toggleLike = (videoId: string) => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter((id) => id !== videoId));
    } else {
      setLikedVideos([...likedVideos, videoId]);
    }
  };

  useEffect(() => {}, [playlistItems]);

  useEffect(() => {
    fetchPlaylistItems();
  }, []);
  useEffect(() => {
    if (isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuth]);

  return (
    <div className="w-full px-4 mt-16 text-white bg-black md:px-7">
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {playlistItems.map((item) => (
          <Card className="bg-blac hover:bg-slate-900">
            <div
              key={item.snippet.resourceId.videoId}
              className="p-4 cursor-pointer hover:shadow-md"
            >
              <img
                onClick={() =>
                  playVideoInNewTab(item.snippet.resourceId.videoId)
                }
                className="object-cover w-full h-40 mb-2"
                src={item.snippet.thumbnails.default.url}
                alt="Thumbnail"
              />
              <div className="flex items-center">
                <p className="text-sm font-bold text-white w-96">
                  {item.snippet.title}
                </p>
                {isAuthenticated ? (
                  <HiHeart size={25} color="red" onClick={toggleLike} />
                ) : (
                  <HiOutlineHeart size={25} color="red" onClick={toggleLike} />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
