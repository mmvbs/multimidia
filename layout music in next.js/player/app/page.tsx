"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audio.currentTime = percent * duration;
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="bg-[#0f1316] flex justify-center min-h-screen items-center font-sans">
      <div className="bg-[#212830] h-[400px] w-[300px] flex flex-col items-center rounded-lg p-4">
        <Image
          src="/a.jpg"
          alt="Album cover"
          width={200}
          height={200}
          className="rounded-md mt-2"
        />
        <h1 className="text-white text-sm mt-3">Twin Flame</h1>
        <h3 className="text-gray-400 text-xs m-0">Weyes Blood</h3>

        <div className="w-3/4 mt-3">
          <div
            className="w-full h-2 bg-[#0f1316] rounded cursor-pointer relative"
            onClick={handleSeek}
          >
            <div
              className="h-2 bg-[#ff302e] rounded"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            ></div>
          </div>
          <div className="flex justify-between text-gray-400 text-[10px] mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex gap-5 items-center mt-4">
          <h3 className="text-white cursor-pointer transform -scale-x-100">▶▶</h3>
          <button
            onClick={togglePlay}
            className="flex justify-center items-center bg-[#ff302e] rounded-full h-8 w-8 cursor-pointer text-white text-sm"
            aria-label={isPlaying ? "Pause" : "Play"}
            type="button"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <h3 className="text-white cursor-pointer">▶▶</h3>
          <Image
            src="/vol.png"
            alt="volume"
            width={12}
            height={12}
            className="cursor-pointer"
          />
        </div>

        <audio ref={audioRef} src="/WB.mp3" />
      </div>
    </div>
  );
}
