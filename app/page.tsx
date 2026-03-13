"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { getPlaylist } from "@/lib/playlists";
import { useSearchParams, useRouter } from "next/navigation";

type SearchMode = "prefix" | "anywhere";
interface Song { Cantor: string; Musica: string; DOHGA: string; }
interface SongsResult { songs: Song[]; total: number; page: number; per_page: number; total_pages: number; }

const FAV_KEY = "sqlyrics_favorites";

// ── Heart icon ──────────────────────────────────────────────────────
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
  </svg>
);

function InnerHome() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playlistParam = searchParams?.get("playlist") ?? "";
  const activePlaylist = playlistParam ? getPlaylist(playlistParam) : undefined;

  // ── Search state ────────────────────────────────────────────────
  const [artistQuery, setArtistQuery] = useState("");
  const [songQuery, setSongQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("prefix");

  // ── Results state ───────────────────────────────────────────────
  const [songs, setSongs] = useState<Song[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // ── Autocomplete states ─────────────────────────────────────────
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const [songSuggestions, setSongSuggestions] = useState<string[]>([]);
  const [showSongSuggestions, setShowSongSuggestions] = useState(false);
  const [activeSongSuggestion, setActiveSongSuggestion] = useState(-1);

  // ── Favorites state ─────────────────────────────────────────────
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // ── Refs ────────────────────────────────────────────────────────
  const heroArtistRef = useRef<HTMLInputElement>(null);
  const headerArtistRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  const heroSongRef = useRef<HTMLInputElement>(null);
  const headerSongRef = useRef<HTMLInputElement>(null);
  const songSuggestionBoxRef = useRef<HTMLDivElement>(null);

  const perPage = 50;
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const acDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hasSearched, setHasSearched] = useState(!!playlistParam);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (artistQuery.trim() || songQuery.trim()) {
      // Blur the currently focused input so mobile keyboard dismisses
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setShowSuggestions(false);
      setShowSongSuggestions(false);
      setHasSearched(true);
      setPage(1);
      if (!hasSearched) fetchSongs(artistQuery, songQuery, 1, mode);
    }
  };

  // ── Favorites persistence ───────────────────────────────────────
  useEffect(() => {
    try {
      const s = localStorage.getItem(FAV_KEY);
      if (s) setFavorites(JSON.parse(s));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch { /* ignore */ }
  }, [favorites]);

  const isFav = (s: Song) =>
    favorites.some(f => f.Cantor === s.Cantor && f.Musica === s.Musica);

  const toggleFav = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      isFav(song)
        ? prev.filter(f => !(f.Cantor === song.Cantor && f.Musica === song.Musica))
        : [...prev, { Cantor: song.Cantor, Musica: song.Musica, DOHGA: song.DOHGA }]
    );
  };

  // ── Main search ─────────────────────────────────────────────────
  const fetchSongs = useCallback(
    (artist: string, song: string, pg: number, m: SearchMode, pList?: string) => {
      setLoading(true);
      const urlParams = new URLSearchParams({ artist, song, mode: m, page: String(pg), per_page: String(perPage) });
      if (pList || playlistParam) {
        urlParams.set("playlist", pList || playlistParam);
      }
      fetch(`/api/songs?${urlParams.toString()}`)
        .then(r => r.json())
        .then((data: SongsResult) => {
          setSongs(data.songs);
          setTotal(data.total);
          setTotalPages(data.total_pages);
          setLoading(false);
        });
    }, [playlistParam]
  );

  useEffect(() => {
    if (!hasSearched) return;
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => { setPage(1); fetchSongs(artistQuery, songQuery, 1, mode); }, 300);
    return () => { if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current); };
  }, [artistQuery, songQuery, mode, fetchSongs, hasSearched]);

  useEffect(() => {
    if (hasSearched) fetchSongs(artistQuery, songQuery, page, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // If a playlist param exists on mount, fetch it immediately
    if (playlistParam) {
      setArtistQuery("");
      setSongQuery("");
      setHasSearched(true);
      fetchSongs("", "", 1, mode, playlistParam);
    }
  }, [playlistParam]);

  const artistAcDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const songAcDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Autocomplete ────────────────────────────────────────────────
  useEffect(() => {
    if (artistAcDebounceRef.current) clearTimeout(artistAcDebounceRef.current);
    if (!artistQuery.trim()) { setSuggestions([]); setShowSuggestions(false); return; }
    artistAcDebounceRef.current = setTimeout(() => {
      fetch(`/api/artists?q=${encodeURIComponent(artistQuery)}&mode=${mode}`)
        .then(r => r.json())
        .then((data: { artists: string[] }) => {
          setSuggestions(data.artists);
          // Only show dropdown if one of the artist inputs is currently focused
          if (
            document.activeElement === heroArtistRef.current ||
            document.activeElement === headerArtistRef.current
          ) {
            setShowSuggestions(data.artists.length > 0);
          }
          setActiveSuggestion(-1);
        });
    }, 150);
    return () => { if (artistAcDebounceRef.current) clearTimeout(artistAcDebounceRef.current); };
  }, [artistQuery, mode]);

  useEffect(() => {
    if (songAcDebounceRef.current) clearTimeout(songAcDebounceRef.current);
    if (!songQuery.trim()) { setSongSuggestions([]); setShowSongSuggestions(false); return; }
    songAcDebounceRef.current = setTimeout(() => {
      fetch(`/api/songs_autocomplete?q=${encodeURIComponent(songQuery)}&mode=${mode}`)
        .then(r => r.json())
        .then((data: { songs: string[] }) => {
          setSongSuggestions(data.songs);
          // Only show dropdown if one of the song inputs is currently focused
          if (
            document.activeElement === heroSongRef.current ||
            document.activeElement === headerSongRef.current
          ) {
            setShowSongSuggestions(data.songs.length > 0);
          }
          setActiveSongSuggestion(-1);
        });
    }, 150);
    return () => { if (songAcDebounceRef.current) clearTimeout(songAcDebounceRef.current); };
  }, [songQuery, mode]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !heroArtistRef.current?.contains(target) &&
        !headerArtistRef.current?.contains(target) &&
        !suggestionBoxRef.current?.contains(target)
      ) setShowSuggestions(false);

      if (
        !heroSongRef.current?.contains(target) &&
        !headerSongRef.current?.contains(target) &&
        !songSuggestionBoxRef.current?.contains(target)
      ) setShowSongSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectSuggestion = (name: string) => {
    setArtistQuery(name);
    setShowSuggestions(false);
    setSuggestions([]);
    if (!hasSearched) {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      setHasSearched(true);
      setPage(1);
      fetchSongs(name, songQuery, 1, mode);
    } else {
      handleSearchSubmit();
    }
  };

  const selectSongSuggestion = (name: string) => {
    setSongQuery(name);
    setShowSongSuggestions(false);
    setSongSuggestions([]);
    if (!hasSearched) {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      setHasSearched(true);
      setPage(1);
      fetchSongs(artistQuery, name, 1, mode);
    } else {
      handleSearchSubmit();
    }
  };

  const handleArtistKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !showSuggestions) {
      handleSearchSubmit();
      return;
    }
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveSuggestion(p => Math.min(p + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveSuggestion(p => Math.max(p - 1, 0)); }
    else if (e.key === "Enter" && activeSuggestion >= 0) { e.preventDefault(); selectSuggestion(suggestions[activeSuggestion]); }
    else if (e.key === "Escape") setShowSuggestions(false);
  };

  const handleSongKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !showSongSuggestions) {
      handleSearchSubmit();
      return;
    }
    if (!showSongSuggestions) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveSongSuggestion(p => Math.min(p + 1, songSuggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveSongSuggestion(p => Math.max(p - 1, 0)); }
    else if (e.key === "Enter" && activeSongSuggestion >= 0) { e.preventDefault(); selectSongSuggestion(songSuggestions[activeSongSuggestion]); }
    else if (e.key === "Escape") setShowSongSuggestions(false);
  };

  const highlight = (text: string, query: string) => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1 || !query) return <span>{text}</span>;
    return <>
      <span className="text-slate-400">{text.slice(0, idx)}</span>
      <span className="text-slate-100 font-semibold">{text.slice(idx, idx + query.length)}</span>
      <span className="text-slate-400">{text.slice(idx + query.length)}</span>
    </>;
  };

  // ── Pagination ──────────────────────────────────────────────────
  const goTo = (pg: number) => {
    if (pg < 1 || pg > totalPages) return;
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = (): (number | "…")[] => {
    const pages: (number | "…")[] = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1);
      if (page > 3) pages.push("…");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  // ── Shared sub-renders ──────────────────────────────────────────
  const modeToggle = (
    <div className="relative flex items-center bg-white/5 rounded-full border border-white/10 p-1 gap-0.5">
      <div
        className="absolute top-1 bottom-1 rounded-full bg-violet-600 shadow-lg shadow-violet-500/30 transition-all duration-300 ease-in-out"
        style={{ left: mode === "prefix" ? "4px" : "50%", right: mode === "prefix" ? "50%" : "4px" }}
      />
      {(["prefix", "anywhere"] as SearchMode[]).map(m => (
        <button key={m} onClick={() => setMode(m)}
          title={`Search ${m}`}
          className={`relative z-10 flex items-center justify-center w-10 h-6 sm:w-11 sm:h-7 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer ${mode === m ? "text-white" : "text-slate-400 hover:text-slate-300"}`}
        >
          <span className="font-mono">{m === "prefix" ? "ab·" : "·ab·"}</span>
        </button>
      ))}
    </div>
  );

  const suggestionDropdown = (
    <div ref={suggestionBoxRef} className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-white/10 bg-[#13131f] shadow-2xl shadow-black/50 overflow-hidden z-50">
      {suggestions.map((name, idx) => (
        <button key={name}
          onMouseDown={e => { e.preventDefault(); selectSuggestion(name); }}
          onMouseEnter={() => setActiveSuggestion(idx)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${idx === activeSuggestion ? "bg-violet-600/20 text-slate-100" : "text-slate-300 hover:bg-white/5"}`}
        >
          <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span>{highlight(name, artistQuery)}</span>
        </button>
      ))}
    </div>
  );

  const songSuggestionDropdown = (
    <div ref={songSuggestionBoxRef} className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-white/10 bg-[#13131f] shadow-2xl shadow-black/50 overflow-hidden z-50">
      {songSuggestions.map((name, idx) => (
        <button key={name}
          onMouseDown={e => { e.preventDefault(); selectSongSuggestion(name); }}
          onMouseEnter={() => setActiveSongSuggestion(idx)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${idx === activeSongSuggestion ? "bg-violet-600/20 text-slate-100" : "text-slate-300 hover:bg-white/5"}`}
        >
          <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
          </svg>
          <span>{highlight(name, songQuery)}</span>
        </button>
      ))}
    </div>
  );

  // ── Favorites panel ─────────────────────────────────────────────
  const favoritesPanel = (
    <div className={`fixed inset-0 z-[60] transition-all duration-300 ${showFavorites ? "" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${showFavorites ? "opacity-100" : "opacity-0"}`}
        onClick={() => setShowFavorites(false)}
      />
      {/* Drawer */}
      <div className={`absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-[#13131f] border-l border-white/10 flex flex-col transition-transform duration-300 ${showFavorites ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-red-400"><HeartIcon filled /></span>
            <h2 className="font-semibold text-slate-100">Favorites</h2>
            <span className="text-xs text-slate-500">({favorites.length})</span>
          </div>
          <div className="flex items-center gap-3">
            {favorites.length > 0 && (
              <button
                onClick={() => setFavorites([])}
                className="text-xs text-slate-500 hover:text-red-400 transition"
              >
                Clear all
              </button>
            )}
            <button onClick={() => setShowFavorites(false)} className="text-slate-400 hover:text-slate-200 transition text-xl leading-none">×</button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-500">
              <HeartIcon filled={false} />
              <p className="text-sm">No favorites yet</p>
              <p className="text-xs text-slate-600">Tap ♥ on any song to save it</p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.05]">
              {favorites.map((fav, i) => (
                <li key={i} className="flex items-center justify-between gap-3 px-5 py-3.5 group hover:bg-white/[0.03] transition">
                  <div className="min-w-0">
                    <span className="inline-block font-mono text-xs font-bold tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded px-1.5 py-0.5 mb-1">{fav.DOHGA}</span>
                    <p className="text-sm font-medium text-slate-200 truncate">{fav.Cantor || "—"}</p>
                    <p className="text-xs text-slate-400 truncate">{fav.Musica}</p>
                  </div>
                  <button
                    onClick={() => setFavorites(prev => prev.filter((_, j) => j !== i))}
                    className="text-slate-600 hover:text-red-400 transition shrink-0 text-lg leading-none"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  // ── Favorites FAB ───────────────────────────────────────────────
  const favFab = (
    <button
      onClick={() => setShowFavorites(true)}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl shadow-black/40 border transition-all duration-300 ${favorites.length > 0
        ? "bg-red-500 border-red-400 text-white hover:bg-red-400"
        : "bg-white/10 border-white/20 text-slate-400 hover:bg-white/15"
        }`}
    >
      <HeartIcon filled={favorites.length > 0} />
      {favorites.length > 0 && <span className="text-sm font-semibold">{favorites.length}</span>}
    </button>
  );

  // Row heart button
  const favBtn = (song: Song) => (
    <button
      onClick={e => toggleFav(song, e)}
      title={isFav(song) ? "Remove from favorites" : "Add to favorites"}
      className={`shrink-0 transition-colors ${isFav(song) ? "text-red-400 hover:text-red-300" : "text-slate-700 hover:text-red-400"}`}
    >
      <HeartIcon filled={isFav(song)} />
    </button>
  );

  // ── HERO VIEW (no search yet) ───────────────────────────────────
  if (!hasSearched) return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div 
          className="text-center mb-10 cursor-pointer group"
          onClick={() => { setArtistQuery(""); setSongQuery(""); setHasSearched(false); router.replace("/"); }}
        >
          <div className="text-6xl mb-4 group-hover:scale-105 transition-transform">🎤</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-3 group-hover:brightness-110 transition-all">
            SQLyrics
          </h1>
          <p className="text-slate-500 text-base">Find your next karaoke song</p>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-6">
          {modeToggle}
        </div>

        {/* Search inputs */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:gap-4 w-full">
          {/* Artist */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
              </svg>
            </div>
            <input
              ref={heroArtistRef}
              type="text"
              value={artistQuery}
              onChange={e => setArtistQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onKeyDown={handleArtistKeyDown}
              placeholder="Artist name…"
              autoComplete="off"
              autoFocus
              className="w-full pl-12 pr-4 py-4 sm:py-5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition shadow-inner"
            />
            {showSuggestions && suggestionDropdown}
          </div>

          {/* Song */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              </svg>
            </div>
            <input
              ref={heroSongRef}
              type="text"
              value={songQuery}
              onChange={e => setSongQuery(e.target.value)}
              onFocus={() => songSuggestions.length > 0 && setShowSongSuggestions(true)}
              onKeyDown={handleSongKeyDown}
              placeholder="Song title…"
              autoComplete="off"
              className="w-full pl-12 pr-4 py-4 sm:py-5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition shadow-inner"
            />
            {showSongSuggestions && songSuggestionDropdown}
          </div>

          {/* Search Button (Mobile UI focus) */}
          <button type="submit" className="w-full py-4 mt-2 sm:mt-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg shadow-lg shadow-violet-600/30 transition-all active:scale-[0.98]">
            Search
          </button>
          
          {/* Browse All Songs Button */}
          <button 
            type="button" 
            onClick={() => {
              setArtistQuery("");
              setSongQuery("");
              setHasSearched(true);
              setPage(1);
              router.replace("/");
              fetchSongs("", "", 1, mode);
            }}
            className="w-full py-3.5 mt-1 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-medium text-base transition-all active:scale-[0.98]"
          >
            Browse all songs
          </button>

          {/* Playlists Button */}
          <Link 
            href="/playlists"
            className="w-full py-3.5 mt-1 flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-violet-600/20 hover:border-violet-500/30 text-violet-300 font-medium text-base transition-all active:scale-[0.98]"
          >
            Recommended Playlists
          </Link>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">117,000+ songs in the catalogue</p>
      </div>

      {favFab}
      {favoritesPanel}
    </div>
  );

  // ── RESULTS VIEW (has search) ───────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a14] text-slate-200 font-sans">

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a14]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-3 sm:px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo */}
            <button onClick={() => { setArtistQuery(""); setSongQuery(""); setHasSearched(false); router.replace("/"); }} className="flex items-center gap-2 shrink-0 group cursor-pointer">
              <span className="text-xl group-hover:scale-110 transition-transform">🎤</span>
              <span className="text-sm font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent hidden sm:block group-hover:brightness-110 transition-all">
                SQLyrics
              </span>
            </button>

            {/* Artist input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 flex">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                </svg>
              </div>
              <input
                ref={headerArtistRef}
                type="text"
                value={artistQuery}
                onChange={e => setArtistQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onKeyDown={handleArtistKeyDown}
                placeholder="Artist…"
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
              />
              {showSuggestions && suggestionDropdown}
            </form>

            {/* Song input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 flex">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
              </div>
              <input
                ref={headerSongRef}
                type="text"
                value={songQuery}
                onChange={e => setSongQuery(e.target.value)}
                onFocus={() => songSuggestions.length > 0 && setShowSongSuggestions(true)}
                onKeyDown={handleSongKeyDown}
                placeholder="Song…"
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
              />
              {showSongSuggestions && songSuggestionDropdown}
            </form>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Link href="/playlists" title="Playlists" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-violet-600/20 text-slate-300 hover:text-violet-300 transition-colors flex shrink-0">
                <span className="text-lg">🎧</span>
              </Link>
              {modeToggle}
            </div>
          </div>
        </div>
      </header>

      {/* Playlist Banner */}
      {activePlaylist && (
        <div className={`w-full bg-gradient-to-r ${activePlaylist.coverColor} px-4 py-6 sm:py-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="mx-auto max-w-5xl relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{activePlaylist.name}</h2>
            <p className="text-white/80 max-w-2xl">{activePlaylist.description}</p>
            <button 
              onClick={() => { router.replace("/"); setHasSearched(false); }}
              className="mt-4 text-sm font-medium text-white/90 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <main className="mx-auto max-w-5xl px-3 sm:px-4 py-4 sm:py-6 animate-fade-in-up">
        {/* Stats */}
        <div className="mb-3 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-400">
            {loading
              ? <span className="animate-pulse text-slate-500">Searching…</span>
              : <><span className="text-slate-200 font-semibold">{total.toLocaleString()}</span> songs found</>
            }
          </span>
          <span className="text-slate-500">Page {page} / {totalPages.toLocaleString()}</span>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-2">
          {!loading && songs.length === 0 && (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center gap-2">
              <span className="text-4xl">🔍</span><span>No songs found</span>
            </div>
          )}
          {songs.map((song, i) => (
            <div key={`card-${i}`} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-slate-200 truncate">{song.Cantor || <span className="italic text-slate-600">—</span>}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{song.Musica}</p>
                {activePlaylist?.songMetadata?.[song.DOHGA] && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400 mt-1">
                    {activePlaylist.songMetadata[song.DOHGA]}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="inline-block font-mono text-xs font-bold tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded px-1.5 py-0.5">{song.DOHGA}</span>
                {favBtn(song)}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02] shadow-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Artist</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Song</th>
                {activePlaylist?.songMetadata && <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Category</th>}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Code</th>
                <th className="px-4 py-3 w-10 text-center">Fav</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {!loading && songs.length === 0 && (
                <tr><td colSpan={activePlaylist?.songMetadata ? 5 : 4} className="px-4 py-16 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2"><span className="text-4xl">🔍</span><span>No songs found</span></div>
                </td></tr>
              )}
              {songs.map((song, i) => (
                <tr key={`row-${i}`} className="group hover:bg-violet-500/5 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                    {song.Cantor || <span className="italic text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{song.Musica}</td>
                  {activePlaylist?.songMetadata && (
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-1 rounded inline-block whitespace-nowrap">
                        {activePlaylist.songMetadata[song.DOHGA] || "—"}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-bold tracking-widest text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-md px-2 py-1 whitespace-nowrap">{song.DOHGA}</span>
                  </td>
                  <td className="px-4 py-3 text-center">{favBtn(song)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <svg className="w-4 h-4 animate-spin text-violet-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Loading…
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-1 sm:gap-1.5">
            <button onClick={() => goTo(page - 1)} disabled={page === 1}
              className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs sm:text-sm">
              ← <span className="hidden sm:inline">Prev</span>
            </button>
            {pageNumbers().map((p, idx) =>
              p === "…"
                ? <span key={`e-${idx}`} className="px-1.5 text-slate-600 text-sm">…</span>
                : <button key={p} onClick={() => goTo(p as number)}
                  className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition border ${p === page ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"}`}
                >{p}</button>
            )}
            <button onClick={() => goTo(page + 1)} disabled={page === totalPages}
              className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs sm:text-sm">
              <span className="hidden sm:inline">Next</span> →
            </button>
          </div>
        )}
      </main>

      {favFab}
      {favoritesPanel}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a14]" />}>
      <InnerHome />
    </Suspense>
  );
}
