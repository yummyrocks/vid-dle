"use client";

import { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassPlusIcon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerXIcon,
} from "@phosphor-icons/react";

type VideoPlayerProps = {
  className?: string;
  src: string;
  /** 0.2 | 0.6 | 1.0 — seberapa banyak durasi video yang terbuka */
  unlockedFraction: number;
  /** suara menyala setelah tekan "Kurang Yakin" pertama kali */
  soundOn: boolean;
  onOpenZoom?: () => void;
};

export default function VideoPlayer({
  className,
  src,
  unlockedFraction,
  soundOn,
  onOpenZoom,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [playhead, setPlayhead] = useState(0);

  const unlockedEnd = duration * unlockedFraction;

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = !soundOn;
  }, [soundOn]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration) return;
    if (video.paused) video.play().catch(() => {});
  }, [unlockedFraction, duration]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video?.duration && Number.isFinite(video.duration)) {
      setDuration(video.duration);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !duration) return;
    if (video.currentTime >= unlockedEnd - 0.03) {
      video.currentTime = 0;
      setPlayhead(0);
    } else {
      setPlayhead(Math.min(video.currentTime, unlockedEnd) / duration);
    }
  };

  const handleSeeking = () => {
    const video = videoRef.current;
    if (video && duration && video.currentTime > unlockedEnd) {
      video.currentTime = unlockedEnd;
    }
    if (video && duration) {
      setPlayhead(Math.min(video.currentTime, unlockedEnd) / duration);
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-xl bg-black/60 ring-1 ring-white/10">
        <video
          ref={videoRef}
          className="block aspect-video w-full object-contain"
          src={src}
          autoPlay
          loop
          muted={!soundOn}
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          controlsList="nodownload noplaybackrate noremoteplayback"
        />

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {Math.round(unlockedFraction * 100)}% terbuka
        </div>

        {soundOn ? (
          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            <SpeakerHighIcon size={14} weight="bold" /> Suara aktif
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/70 px-3 py-2.5">
          <button
            type="button"
            onClick={handlePlayPause}
            aria-label={isPaused ? "Putar" : "Jeda"}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
          >
            {isPaused ? <PlayIcon size={18} weight="fill" /> : <PauseIcon size={18} weight="fill" />}
          </button>

          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/40"
              style={{ width: `${unlockedFraction * 100}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-emerald-400"
              style={{ width: `${playhead * 100}%` }}
            />
          </div>

          <span className="flex items-center gap-1 text-[11px] font-medium text-white/80">
            {soundOn ? <SpeakerHighIcon size={14} /> : <SpeakerXIcon size={14} />}
          </span>

          {onOpenZoom ? (
            <button
              type="button"
              onClick={onOpenZoom}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/30"
            >
              <MagnifyingGlassPlusIcon size={14} weight="bold" /> Periksa Detail
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
