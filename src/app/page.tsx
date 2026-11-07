"use client";
import Image from "next/image";
import VideoPreview from "@/components/VideoPreview";
import DecisionButton from "@/components/DecisionButton";
export default function Home() {
  

  return (
    <div>
      <VideoPreview src="/ai-video/ai-1.mp4" previewDuration={2}/>
      <DecisionButton text="Gak Yakin" />
    </div>
  );
}
