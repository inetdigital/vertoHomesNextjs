"use client";

import { Bounded } from "@/components/Bounded";
//import ReactPlayer from "react-player/vimeo";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/vimeo"), { ssr: false });

const Video = ({ slice }) => {
  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div className="relative w-full aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={slice.primary?.video_link?.embed_url}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
    </Bounded>
  );
};

export default Video;
