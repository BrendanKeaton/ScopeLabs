"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchVideoComments,
  fetchVideoData,
  fetchAllVideos,
  VideoInterface,
  Comment,
  addNewComment,
} from "@/api/api";
import { MessageCircle, Video, Play } from "lucide-react";
import Link from "next/link";
import { hourglass } from "ldrs";
import { Button } from "../ui/button";

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

const DashboardDynamic = ({ user_id }: { user_id: string }) => {
  hourglass.register();
  const params = useParams();

  const id = Array.isArray(params?.video) ? params.video[0] : params?.video;
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
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [allVideos, setAllVideos] = useState<VideoInterface[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  // Handle fetching a video, hardcoded user for purpose of this take home
  const handleFetchVideoData = async () => {
    setLoading(true);
    setError(null);

    try {
      const video = await fetchVideoData("brendan_keaton", id);
      setVideoData(video);
    } catch (error) {
      setError(error instanceof Error ? error.message : "an error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Get all videos for the "other videos" section, again with hardcoded user_id
  const handleFetchAllVideos = async () => {
    try {
      const videos = await fetchAllVideos("brendan_keaton");
      setAllVideos(videos);
    } catch (error) {
      setError(error instanceof Error ? error.message : "an error occurred");
    }
  };

  const handleFetchVideoComments = async () => {
    if (videoData.id === "NO_ID") return;

    setLoading(true);
    setError(null);

    try {
      const comments = await fetchVideoComments(videoData.id);
      setCommentData(comments);
    } catch (error) {
      setError(error instanceof Error ? error.message : "an error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new comment using the form in the return section
  const handleAddNewComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newComment = formData.get("comment") as string;
    if (id != null) {
      try {
        await addNewComment(id, newComment, user_id);
        setTriggerReload(!triggerReload);
        setShowForm(false);
      } catch (error) {
        console.error("Error adding comment:", error);
        alert("Failed to add comment.");
      }
    }
  };

  // Update all data on page change / comment added, Don't show comments unless video is selected
  useEffect(() => {
    handleFetchVideoData();
    handleFetchAllVideos();
    if (videoData.id !== "NO_ID") {
      handleFetchVideoComments();
    }
  }, [videoData.id, triggerReload]);

  if (loading) {
    return (
      <div className="min-h-[80vh] min-w-full flex items-center justify-center">
        <l-hourglass
          size="64"
          stroke="1"
          bg-opacity="0.1"
          speed="3"
          color="#2D8086"
        ></l-hourglass>
      </div>
    );
  }

  // tailwind & design for main pages.
  return (
    <main className="flex flex-col md:flex-row justify-between pt-10 gap-x-8 mb-32 w-full">
      <div>
        {error && <p className="text-red-500">{error}</p>}

        {videoData ? (
          <div className="">
            <iframe
              src={videoData.video_url}
              allowFullScreen
              title={videoData.title}
              width="1024"
              height="576"
              className="rounded-xl hidden xl:flex"
            />
            <iframe
              src={videoData.video_url}
              allowFullScreen
              title={videoData.title}
              width="640"
              height="360"
              className="rounded-xl max-w-full xl:hidden"
            />
            <div className="pt-4 w-full flex flex-row justify-start xl:justify-between xl:items-center">
              <div className="flex flex-col">
                <p className="text-[20px] xl:text-[32px] font-bold text-et-teal leading-none">
                  {videoData.title}
                </p>
                <p className="text-[12px] xl:text-[18px] text-et-black font-outfit leading-none pt-1">
                  posted by{" "}
                  <span className="font-medium text-et-teal font-outfit">
                    {videoData.user_id}
                  </span>
                </p>
              </div>
              <p className="text-[12px] pl-4 xl:pl-0 pt-1 xl:pt-0 xl:text-[18px] font-bold font-outfit text-et-black">
                {new Date(videoData.created_at).toLocaleDateString()}
              </p>
            </div>
            <p className="pt-4 font-outfit leading-snug text-gray-600">
              {videoData.description}
            </p>
            <div className="text-[20px] xl:text-[32px] font-bold text-et-black justify-between leading-none flex flex-row items-center mt-8">
              <div className="flex flex-row gap-x-2">
                <MessageCircle size={32} strokeWidth={2} />
                <p>comments</p>
              </div>
              <Button
                variant={"default"}
                size={"edTech"}
                onClick={() => setShowForm(!showForm)}
              >
                Add Comment +
              </Button>
            </div>
            {showForm && (
              <div className="mb-4 p-4 mt-6">
                <h3 className="font-bold text-lg mb-2">add a new comment</h3>
                <form
                  className="w-full flex flex-col"
                  onSubmit={handleAddNewComment}
                >
                  <div className="mb-2 rounded-2xl">
                    <textarea
                      id="comment"
                      name="comment"
                      className="w-full rounded-[0.3rem] border pl-2 py-2 border-gray-400 text-et-black font-light font-outfit placeholder:text-gray-400 text-[12px] md:text-[14px]"
                      placeholder="enter your comment"
                      rows={3}
                    ></textarea>
                  </div>
                  <Button
                    variant={"default"}
                    size={"edTech"}
                    className="place-self-end"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            )}
            {commentData.length > 0 ? (
              <div>
                {commentData.map((comment) => (
                  <div
                    key={comment.id}
                    className="comment p-4 mt-4 mb-4 border border-gray-300 rounded-xl"
                  >
                    <div className="flex flex-row justify-between items-center pb-3">
                      <p className="font-medium text-et-teal font-outfit text-[12px] xl:text-[18px]">
                        {comment.user_id}
                      </p>
                      <p className="text-[10px] xl:text-[16px] font-light font-outfit text-et-black">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 mt-4 mb-8 font-medium text-et-teal font-outfit text-[12px] xl:text-[18px] border border-gray-300 rounded-xl">
                no comments available.
              </p>
            )}
          </div>
        ) : (
          <p>no video data available.</p>
        )}
      </div>
      <div className="w-full">
        <div className="justify-between flex flex-row items-center mb-2">
          <Video size={48} strokeWidth={1.5} />
          <h2 className="font-bold text-[24px] 2xl:text-[32px]">
            other videos
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
                  <Play
                    fill="#2D8086"
                    size={32}
                    strokeWidth={0}
                    className="min-w-[32px]"
                  />
                  <p className="font-medium text-[16px] line-clamp-1 font-outfit">
                    {video.title}
                  </p>
                </Link>
                <p className="text-gray-400 font-light font-outfit text-[14px] pl-2">
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

export default DashboardDynamic;
