"use client";
import { useEffect, useState } from "react";
import { fetchVideoData, fetchAllVideos, VideoInterface } from "@/api/api";
import Link from "next/link";
import { Video, Play } from "lucide-react";

import { hourglass } from "ldrs";

//fix for ring from ldrs, from below github issue. Hoping its fixed soon and this can be removed.
// https://github.com/GriffinJohnston/ldrs/issues/32
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "l-hourglass": {
        size?: string | number;
        stroke?: string | number;
        color?: string | number;
        speed?: string | number;
      };
    }
  }
}

const Dashboard = () => {
  hourglass.register();
  const [videoData, setVideoData] = useState<VideoInterface>({
    created_at: "01/01/2000",
    video_url: "NO_URL",
    user_id: "NO_USER",
    title: "NO_TITLE",
    description: "NO_DESC",
    num_comments: 0,
    id: "NO_ID",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allVideos, setAllVideos] = useState<VideoInterface[]>([]);

  const handleFetchVideoData = async () => {
    setLoading(true);
    setError(null);

    try {
      const video = await fetchVideoData("brendan_keaton");
      setVideoData(video);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllVideos = async () => {
    try {
      const videos = await fetchAllVideos("brendan_keaton");
      setAllVideos(videos);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleFetchVideoComments = async () => {
    if (videoData.id === "NO_ID") return;

    setLoading(true);
    setError(null);
  };

  // Fetch video data and comments
  useEffect(() => {
    handleFetchVideoData();
    handleFetchAllVideos();
  }, []);

  useEffect(() => {
    if (videoData.id !== "NO_ID") {
      handleFetchVideoComments();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] min-w-full flex items-center justify-center">
        <l-hourglass
          size="64"
          stroke="3"
          bg-opacity="0.1"
          speed="3"
          color="#2D8086"
        ></l-hourglass>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-between pt-10 gap-x-8">
      <div className="w-full">
        <div className="flex flex-row items-center mb-2">
          <Video size={48} strokeWidth={1.5} className="mr-5" />
          <h2 className="font-bold text-[24px] 2xl:text-[32px]">
            available videos
          </h2>
        </div>
        <ul className="">
          {allVideos.map((video) => (
            <li key={video.id} className="mt-4">
              <div className="flex flex-row justify-between items-center">
                <Link
                  href={`/protected/${video.id}`}
                  className="gap-x-3 flex flex-row items-center text-et-teal hover:text-et-black"
                >
                  <Play fill="#2D8086" size={32} strokeWidth={0} />
                  <p className="font-medium text-[16px] line-clamp-1 font-outfit">
                    {video.title}
                  </p>
                </Link>
                <p className="text-gray-400 font-outfit font-light text-[14px] pl-2">
                  {new Date(video.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="w-full bg-gray-200 h-[1px] mt-4"></div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
