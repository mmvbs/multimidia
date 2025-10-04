"use client";
import { useRef, useState, } from "react";
export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  function togglePlay() {
    setIsPlaying(!isPlaying);
    const audio = audioRef.current;
    if (!audio) return;
   if (!isPlaying) {
        audio.play().catch(e => console.error("Erro ao tentar tocar o áudio:", e));
    } else {
        audio.pause();
    }
  }
  return (
     <div className="bg-[rgb(15,19,22)] flex items-center justify-center h-screen">
      <div className="bg-[rgb(32,40,48)] h-[400px] w-[300px] rounded-[10px] flex flex-col items-center justify-center">
        <img className="h-[200] w-[200]" src="a.jpg" alt="" />
        <h1 className="text-white text-[16px] font-bold mt-4">Twin Flame</h1>
        <h3 className="text-[gray] text-[12px] font-bold mt-2">Weyes Blood</h3>
      <div className="w-[50%] mt-4">
        <div className="w-[100%] h-[4px] bg-[rgb(15,19,22)] rounded-full "></div>
        <div className="flex items-start justify-between text-[12px] text-[gray]">
        <h3>0:00</h3>
        <h3>4:42</h3>
        </div>
      </div>
      <div className="flex items-center justify-between w-[50%]">
        <h3 className="scale-x-[-1] cursor-pointer">▶▶</h3>  
        <button
        className="text-white w-[24px] h-[24px] rounded-full bg-[#ff302e] flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
        >
        {isPlaying ? "⏸" : "▶"}
        </button>
        <audio src="WB.mp3" ref={audioRef}>
          <track kind="captions" />
        </audio>
        <h3 className="cursor-pointer">▶▶</h3>
        <img src="vol.png" alt="volume" className="vol h-[12] w-[12] cursor-pointer" />
      </div>
      </div>
     </div>
  );
}