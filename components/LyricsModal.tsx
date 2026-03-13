"use client";

import { useEffect, useState } from "react";

// Matches the DB song structure used in the app
type Song = {
  Cantor: string;
  Musica: string;
  DOHGA: string;
  PV?: string;
  ATUALIZACAO?: string;
  CK?: string;
  Romaji?: string;
  musica_numerica?: string;
  cantor_numerico?: string;
};

interface LyricsModalProps {
  song: Song;
  onClose: () => void;
}

export default function LyricsModal({ song, onClose }: LyricsModalProps) {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent scrolling on the body while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchLyrics() {
      setLoading(true);
      setError(null);
      
      const artist = song.Cantor ? song.Cantor.replace(/\(kpop\)/gi, "").trim() : "";
      const track = song.Musica || "";

      if (!artist || !track) {
        if (isMounted) {
          setError("Cannot find lyrics without an artist or song name.");
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(track)}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            if (isMounted) setError("No lyrics found for this song.");
          } else {
            if (isMounted) setError("Failed to load lyrics from the server.");
          }
          if (isMounted) setLoading(false);
          return;
        }

        const data = await res.json();
        
        if (isMounted) {
          // Prefer plain lyrics if synced ones aren't available
          if (data.plainLyrics) {
            setLyrics(data.plainLyrics);
          } else if (data.syncedLyrics) {
            // strip out time tags like [00:35.66]
            const clean = data.syncedLyrics.replace(/\[\d+:\d+\.\d+\]/g, "").trim();
            setLyrics(clean || "Lyrics are empty.");
          } else {
            setError("No lyrics found for this song.");
          }
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Network error while trying to fetch lyrics.");
          setLoading(false);
        }
      }
    }

    fetchLyrics();

    return () => {
      isMounted = false;
    };
  }, [song]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative flex flex-col w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/10 bg-white/5">
          <div className="min-w-0 pr-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 truncate">{song.Musica}</h2>
            <p className="text-sm sm:text-base text-violet-300 font-medium truncate mt-0.5">{song.Cantor || "Unknown Artist"}</p>
          </div>
          <button 
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-8 h-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              <p className="text-slate-400 animate-pulse font-medium">Fetching lyrics...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <span className="text-4xl">📝</span>
              <p className="text-slate-300 font-medium text-lg">{error}</p>
              <p className="text-slate-500 text-sm">You can still sing it by heart!</p>
            </div>
          ) : (
            <pre className="font-sans whitespace-pre-wrap text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-200 text-center max-w-xl mx-auto py-4">
              {lyrics}
            </pre>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] text-center">
           <p className="text-xs text-slate-500">
              Lyrics provided by <a href="https://lrclib.net/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">lrclib.net</a>
           </p>
        </div>
      </div>
    </div>
  );
}
