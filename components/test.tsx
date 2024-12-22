"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export type Video = {
  created_at: string;
  video_url: string;
  user_id: string;
  title: string;
  description: string;
  num_comments: number;
  id: string;
};

interface DashboardProps {
  userId: string;
}

const Test: React.FC<DashboardProps> = ({ userId }) => {
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch video data from the FastAPI endpoint
  const fetchVideoData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/py/getVideo?user_id=brendan_keaton");
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }

      const data = await response.json();
      const video = data.videos[0];

      //check if the video_url is a YouTube URL and modify it for embedding
      if (video.video_url.includes("youtube.com/watch?v=")) {
        const videoId = new URL(video.video_url).searchParams.get("v");
        if (videoId) {
          video.video_url = `https://www.youtube.com/embed/${videoId}`;
        }
      }

      setVideoData(video);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl font-bold mb-4">Video Information</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {videoData ? (
        <div>
          <h2 className="text-lg font-semibold">{videoData.title}</h2>
          <p>{videoData.description}</p>
          <p>
            <strong>User ID:</strong> {videoData.user_id}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(videoData.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Number of Comments:</strong> {videoData.num_comments}
          </p>
          <iframe
            src={videoData.video_url}
            allowFullScreen
            title={videoData.title}
            width="560"
            height="315"
          />
        </div>
      ) : (
        <p>No video data available.</p>
      )}

      <p>
        <Link href="/api/py/getVideo">
          <code className="font-mono font-bold">Go to API Endpoint</code>
        </Link>
      </p>
    </main>
  );
};

export default Test;
