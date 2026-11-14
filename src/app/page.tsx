import Image from "next/image";
import VideoPreview from "@/components/VideoPreview";
import DecisionButton from "@/components/DecisionButton";
export default function Home() {
  

  return (
    <div>
      <VideoPreview src="/ai-video/ai-2.mp4" previewDuration={1} isMuted={false}/>
      <DecisionButton text="Gak Yakin" />
    </div>
  );
}
