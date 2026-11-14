'use client'
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

export type VideoPreviewProps = {
  className?: string;
  src: string;
  previewDuration: number;
  isMuted: boolean;
};

export default function VideoPreview({
  className,
  src,
  previewDuration,
  isMuted
}: VideoPreviewProps) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPaused, setPaused] = useState(true);

  const handleSeeking = () => {
    const video = videoRef.current;
    if (video && video.currentTime > previewDuration) {
      video.currentTime = previewDuration;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= previewDuration) {
      video.currentTime = 0;
      setPaused(false);
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (video?.paused) {
      setPaused(true);
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    // play kalo pause + kurang dari preview duration
    if (video?.paused && video.currentTime < previewDuration) {
      video?.play();
      setPaused(false);
      // pause kalo playing
    } else {
      video?.pause();
      setPaused(true);
    }
  };

  return (
    <div className={className}>
      <div className="bg-red-300 video-element">
        <video
          ref={videoRef}
          width={400}
          height={400}
          autoPlay={true}
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPause={handlePause}
          onSeeking={handleSeeking}
          controlsList="nodownload nofullscreen noplaybackrate noremoteplayback"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <button onClick={handlePlayPause}>
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </div>
  );
}
