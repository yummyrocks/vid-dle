"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowsOutSimpleIcon, MinusIcon, PlusIcon, XIcon } from "@phosphor-icons/react";

type ZoomModalProps = {
  src: string;
  unlockedFraction: number;
  soundOn: boolean;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ZoomModal({ src, unlockedFraction, soundOn, onClose }: ZoomModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [duration, setDuration] = useState(0);

  const unlockedEnd = duration * unlockedFraction;

  const clampOffset = useCallback((next: { x: number; y: number }, nextScale: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return next;
    const maxX = ((nextScale - 1) * rect.width) / 2;
    const maxY = ((nextScale - 1) * rect.height) / 2;
    const x = clamp(next.x, -maxX, maxX);
    const y = clamp(next.y, -maxY, maxY);
    return x === next.x && y === next.y ? next : { x, y };
  }, []);

  const zoomBy = useCallback(
    (factor: number) => {
      const next = clamp(scale * factor, MIN_SCALE, MAX_SCALE);
      setScale(next);
      setOffset((o) => clampOffset(o, next));
    },
    [scale, clampOffset],
  );

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = !soundOn;
  }, [soundOn]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomBy(1.25);
      if (e.key === "-") zoomBy(0.8);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, zoomBy]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 1.15 : 0.87);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= 1 || e.pointerType === "touch") return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, originX: offset.x, originY: offset.y };
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    setOffset(
      clampOffset(
        { x: drag.originX + (e.clientX - drag.startX), y: drag.originY + (e.clientY - drag.startY) },
        scale,
      ),
    );
  };

  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const touchDistance = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchRef.current = { dist: touchDistance(e.touches), scale };
      dragRef.current = null;
      setDragging(true);
    } else if (e.touches.length === 1 && scale > 1) {
      const t = e.touches[0];
      dragRef.current = { startX: t.clientX, startY: t.clientY, originX: offset.x, originY: offset.y };
      setDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const ratio = touchDistance(e.touches) / pinchRef.current.dist;
      const next = clamp(pinchRef.current.scale * ratio, MIN_SCALE, MAX_SCALE);
      setScale(next);
      setOffset((o) => clampOffset(o, next));
    } else if (e.touches.length === 1 && dragRef.current) {
      const t = e.touches[0];
      const drag = dragRef.current;
      setOffset(
        clampOffset(
          { x: drag.originX + (t.clientX - drag.startX), y: drag.originY + (t.clientY - drag.startY) },
          scale,
        ),
      );
    }
  };

  const handleTouchEnd = () => {
    pinchRef.current = null;
    dragRef.current = null;
    setDragging(false);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video?.duration && Number.isFinite(video.duration)) setDuration(video.duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !duration) return;
    if (video.currentTime >= unlockedEnd - 0.03) video.currentTime = 0;
  };

  const handleSeeking = () => {
    const video = videoRef.current;
    if (video && duration && video.currentTime > unlockedEnd) video.currentTime = unlockedEnd;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Periksa detail video"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold text-white/80">
          Periksa Detail · {Math.round(unlockedFraction * 100)}% terbuka
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <XIcon size={20} weight="bold" />
        </button>
      </div>

      <div
        ref={wrapRef}
        className="relative flex min-h-0 flex-1 touch-none select-none items-center justify-center overflow-hidden px-4 pb-4"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default" }}
      >
        <video
          ref={videoRef}
          className="max-h-full max-w-full rounded-lg"
          src={src}
          autoPlay
          loop
          muted={!soundOn}
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: dragging ? "none" : "transform 0.15s ease-out",
          }}
          controlsList="nodownload noplaybackrate noremoteplayback"
        />
      </div>

      <div className="flex items-center justify-center gap-2 px-4 pb-5">
        <button
          type="button"
          onClick={() => zoomBy(0.8)}
          aria-label="Perkecil"
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <MinusIcon size={20} weight="bold" />
        </button>
        <span className="w-16 text-center text-sm font-semibold tabular-nums text-white/80">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomBy(1.25)}
          aria-label="Perbesar"
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <PlusIcon size={20} weight="bold" />
        </button>
        <button
          type="button"
          onClick={resetView}
          aria-label="Reset tampilan"
          className="ml-2 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <ArrowsOutSimpleIcon size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}
