"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PiPauseLight, PiPlayLight } from "react-icons/pi";

export default function HeroVideo({ poster, desktopSrc, mobileSrc, alt }) {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    if (prefersReducedMotion || saveData) return;

    const selectSource = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setVideoSrc(isMobile ? mobileSrc || desktopSrc : desktopSrc || mobileSrc);
    };

    selectSource();
  }, [desktopSrc, mobileSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [videoSrc]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        quality={95}
        className="object-cover"
        sizes="100vw"
      />

      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          onCanPlay={() => setIsReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-editorial ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {videoSrc && isReady && (
        <button
          type="button"
          onClick={togglePlayback}
          title={isPaused ? "Reproducir video" : "Pausar video"}
          aria-label={isPaused ? "Reproducir video de portada" : "Pausar video de portada"}
          className="hidden md:inline-flex items-center justify-center w-9 h-9 absolute bottom-5 right-5 z-20 bg-[#121312]/55 hover:bg-[#121312]/85 border border-white/25 text-white transition-colors cursor-pointer"
        >
          {isPaused ? <PiPlayLight className="w-4 h-4" /> : <PiPauseLight className="w-4 h-4" />}
        </button>
      )}
    </>
  );
}