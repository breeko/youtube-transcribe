
interface Media {
  __typename: "Media";
  id: string;
  name: string;
  image: string;
}

interface MediaFull extends Media {
  videos: Video[]
}

interface Video {
  __typename: "Video";
  id: string;
  name: string;
  length: number;
  published: string;
  image: string | null;
  videoPath: string;
  transcript: string
  createdAt: string;
  updatedAt: string;
}

interface User {
  __typename: "User";
  id: string;
  email: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

interface UserFull extends User {
  videos: Video[]
}

interface VideoFull extends Video {
  media: Media
}
