import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  const fetchPlaylistItems = async () => {
    try {
      const playlistId = "RDtThJdNt-_5I";
      const apiKey = "AIzaSyCI2HEdp8lzLN5QX7eOADXtd8b7ppb2_Fo";

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

  useEffect(() => {
    console.log("Render - playlistItems:", playlistItems);
  }, [playlistItems]);

  useEffect(() => {
    fetchPlaylistItems();
  }, []);

  return (
    <div className="px-4 md:px-7 mt-20 w-full bg-black text-white">
      <Button className="bg-red-900" onClick={fetchPlaylistItems}>Fetch Playlist Items</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {playlistItems.map((item) => (
          <div
            key={item.snippet.resourceId.videoId}
            className="border p-4 cursor-pointer hover:shadow-md transition duration-300"
            onClick={() => playVideoInNewTab(item.snippet.resourceId.videoId)}
          >
            <img
              className="w-full h-40 object-cover mb-2"
              src={item.snippet.thumbnails.default.url}
              alt="Thumbnail"
            />
            <p className="font-bold text-sm">{item.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
