"use client";

import { useState, useRef, useEffect } from "react";
import { Bounded } from "@/components/Bounded";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/vimeo"), { ssr: false });

const Video = ({ slice }) => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null, // Uses the viewport
        threshold: 0.25, // At least 50% of the video must be visible to play
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div ref={videoRef} className="relative w-full aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={slice.primary?.video_link?.embed_url}
          controls={slice.primary?.video_controls}
          width="100%"
          height="100%"
          playing={slice.primary?.autoplay_video && isInView}
          muted={slice.primary?.autoplay_video} // Ensures autoplay works
        />
      </div>
    </Bounded>
  );
};

export default Video;
