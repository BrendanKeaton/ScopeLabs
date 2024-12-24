export type VideoInterface = {
  created_at: string;
  video_url: string;
  user_id: string;
  title: string;
  description: string;
  num_comments: number;
  id: string;
};

export type VideoAdd = {
  user_id: string;
  video_url: string;
  title: string;
  description: string;
};

export type Comment = {
  created_at: string;
  content: string;
  user_id: string;
  video_id: string;
  id: string;
};

export const fetchVideoData = async (
  userId: string,
  videoId?: string
): Promise<VideoInterface> => {
  const response = await fetch(`/api/py/getVideo?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch video data");
  }

  const data = await response.json();
  const videos = Array.isArray(data.videos) ? data.videos : [];

  let videoRet = videos[0];
  if (videoId) {
    const foundVideo = videos.find(
      (video: VideoInterface) => video.id === videoId
    );
    if (foundVideo) {
      videoRet = foundVideo;
    }
  }

  if (videoRet.video_url.includes("youtube.com/watch?v=")) {
    const videoId = new URL(videoRet.video_url).searchParams.get("v");
    videoRet.video_url = `https://www.youtube.com/embed/${videoId}`;
  }

  return videoRet;
};

export const fetchVideoComments = async (
  videoId: string
): Promise<Comment[]> => {
  const response = await fetch(`/api/py/getComments?video_id=${videoId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comment data");
  }

  const data = await response.json();
  console.log(data.comments);
  return data.comments;
};

export const fetchAllVideos = async (
  userId: string
): Promise<VideoInterface[]> => {
  const response = await fetch(`/api/py/getVideo?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch video data");
  }

  const data = await response.json();
  const videos = data.videos;

  videos.forEach((video: VideoInterface) => {
    if (video.video_url.includes("youtube.com/watch?v=")) {
      const videoId = new URL(video.video_url).searchParams.get("v");
      video.video_url = `https://www.youtube.com/embed/${videoId}`;
    }
  });

  return videos;
};

export const addNewVideo = async (
  userId: string,
  description: string,
  video_url: string,
  title: string
): Promise<any> => {
  const payload = {
    user_id: userId,
    description: description,
    video_url: video_url,
    title: title,
  };

  const response = await fetch("/api/py/addVideo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to add new video");
  }

  return await response.json();
};

export const addNewComment = async (
  videoId: string,
  content: string,
  userId: string
): Promise<any> => {
  const payload = {
    video_id: videoId,
    content: content,
    user_id: userId,
  };

  const response = await fetch("/api/py/addComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to add new comment");
  }

  return await response.json();
};
