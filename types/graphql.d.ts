
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
  speakers: SpeakerMapping;
  image: string | null;
  videoPath: string;
  transcript: string
  createdAt: string;
  updatedAt: string;
}


interface VideoFull extends Video {
  media: Media
}
