"use client";
import { useRef, useState, useEffect} from "react";

export default function Home() {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
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
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; 

    const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
        setDuration(audio.duration);
    };
    if (audio.duration > 0) {
            setDuration(audio.duration);
        }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
        // Limpa os event listeners quando o componente é desmontado
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return (
     <div className="bg-[rgb(15,19,22)] flex items-center justify-center h-screen">
      <div className="bg-[#202830] h-[400px] w-[300px] rounded-[10px] flex flex-col items-center justify-center p-4">
        <img className="h-[200] w-[200]" src="a.jpg" alt="" />
        <h1 className="text-white text-[16px] font-bold mt-4">Twin Flame</h1>
        <h3 className="text-[gray] text-[12px] mt-2">Weyes Blood</h3>
      <div className="w-[50%]">
        <div className="w-[100%] h-[4px] bg-[rgb(15,19,22)] rounded-full mt-4">
         <div className="h-[4px] bg-[#ff302e] rounded-full" style={{ width: `${progress}%` }} ></div>
        </div>
        <div className="rounded-full mt-4 flex justify-between text-[12px] text-[gray]">
        <h3>{formatTime(currentTime)}</h3>
        <h3>{formatTime(duration)}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between w-[70%] mt-4">
        <h3 className="scale-x-[-1]">▶▶</h3>  
        <button
        className="text-white text-xl w-[30px] rounded-full h-8 w-8 bg-[#ff302e] flex items-center justify-center"
        onClick={togglePlay}
        >
        {isPlaying ? "⏸" : "▶"}
        </button>
        <audio src="WB.mp3" ref={audioRef}>
          <track kind="captions" />
        </audio>
        <h3>▶▶</h3>
        <img src="vol.png" alt="volume" className="vol h-[12] w-[12] cursor-pointer" />
      </div>
      </div>
     </div>
  );
}
