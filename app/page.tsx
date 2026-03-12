"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type SearchMode = "prefix" | "anywhere";

interface Song {
  Cantor: string;
  Musica: string;
}

interface SongsResult {
  songs: Song[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [artistQuery, setArtistQuery] = useState("");
  const [songQuery, setSongQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("prefix");
  const [loading, setLoading] = useState(false);

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const artistInputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  const perPage = 50;
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const acDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Main search ──────────────────────────────────────────────
  const fetchSongs = useCallback(
    (artist: string, song: string, pg: number, searchMode: SearchMode) => {
      setLoading(true);
      const params = new URLSearchParams({
        artist,
        song,
        mode: searchMode,
        page: String(pg),
        per_page: String(perPage),
      });
      fetch(`/api/songs?${params}`)
        .then((r) => r.json())
        .then((data: SongsResult) => {
          setSongs(data.songs);
          setTotal(data.total);
          setTotalPages(data.total_pages);
          setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setPage(1);
      fetchSongs(artistQuery, songQuery, 1, mode);
    }, 300);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [artistQuery, songQuery, mode, fetchSongs]);

  useEffect(() => {
    fetchSongs(artistQuery, songQuery, page, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ── Autocomplete ─────────────────────────────────────────────
  useEffect(() => {
    if (acDebounceRef.current) clearTimeout(acDebounceRef.current);
    if (!artistQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    acDebounceRef.current = setTimeout(() => {
      fetch(`/api/artists?q=${encodeURIComponent(artistQuery)}&mode=${mode}`)
        .then((r) => r.json())
        .then((data: { artists: string[] }) => {
          setSuggestions(data.artists);
          setShowSuggestions(data.artists.length > 0);
          setActiveSuggestion(-1);
        });
    }, 150);
    return () => {
      if (acDebounceRef.current) clearTimeout(acDebounceRef.current);
    };
  }, [artistQuery, mode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        artistInputRef.current &&
        !artistInputRef.current.contains(e.target as Node) &&
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectSuggestion = (name: string) => {
    setArtistQuery(name);
    setShowSuggestions(false);
    setSuggestions([]);
    artistInputRef.current?.focus();
  };

  const handleArtistKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeSuggestion]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const highlight = (text: string, query: string) => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1 || !query) return <span>{text}</span>;
    return (
      <>
        <span className="text-slate-400">{text.slice(0, idx)}</span>
        <span className="text-slate-100 font-semibold">
          {text.slice(idx, idx + query.length)}
        </span>
        <span className="text-slate-400">{text.slice(idx + query.length)}</span>
      </>
    );
  };

  // ── Pagination ────────────────────────────────────────────────
  const goTo = (pg: number) => {
    if (pg < 1 || pg > totalPages) return;
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = (): (number | "…")[] => {
    const pages: (number | "…")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("…");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      )
        pages.push(i);
      if (page < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a14] text-slate-200 font-sans">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a14]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:py-4">

          {/* Row 1: logo + mode toggle */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl">🎤</span>
              <div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  SQLyrics
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 hidden xs:block">
                  Karaoke Song Browser
                </p>
              </div>
            </div>

            {/* Segmented mode toggle */}
            <div className="relative flex items-center bg-white/5 rounded-full border border-white/10 p-1 gap-0.5">
              <div
                className="absolute top-1 bottom-1 rounded-full bg-violet-600 shadow-lg shadow-violet-500/30 transition-all duration-300 ease-in-out"
                style={{
                  left: mode === "prefix" ? "4px" : "50%",
                  right: mode === "prefix" ? "50%" : "4px",
                }}
              />
              <button
                onClick={() => setMode("prefix")}
                className={`relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors duration-300 ${mode === "prefix" ? "text-white" : "text-slate-400 hover:text-slate-300"
                  }`}
              >
                <span className="font-mono tracking-tight">ab·</span>
                <span className="hidden sm:inline">Prefix</span>
              </button>
              <button
                onClick={() => setMode("anywhere")}
                className={`relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors duration-300 ${mode === "anywhere" ? "text-white" : "text-slate-400 hover:text-slate-300"
                  }`}
              >
                <span className="font-mono tracking-tight">·ab·</span>
                <span className="hidden sm:inline">Anywhere</span>
              </button>
            </div>
          </div>

          {/* Row 2: search bars — stacked on mobile, side by side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

            {/* Artist search with autocomplete */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                </svg>
              </div>
              <input
                ref={artistInputRef}
                type="text"
                value={artistQuery}
                onChange={(e) => setArtistQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onKeyDown={handleArtistKeyDown}
                placeholder="Search by artist…"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition text-sm sm:text-base"
              />

              {/* Autocomplete dropdown */}
              {showSuggestions && (
                <div
                  ref={suggestionBoxRef}
                  className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-white/10 bg-[#13131f] shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  {suggestions.map((name, idx) => (
                    <button
                      key={name}
                      onMouseDown={(e) => { e.preventDefault(); selectSuggestion(name); }}
                      onMouseEnter={() => setActiveSuggestion(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${idx === activeSuggestion
                          ? "bg-violet-600/20 text-slate-100"
                          : "text-slate-300 hover:bg-white/5"
                        }`}
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                      </svg>
                      <span>{highlight(name, artistQuery)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Song search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={songQuery}
                onChange={(e) => setSongQuery(e.target.value)}
                placeholder="Search by song…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-3 sm:px-4 py-4 sm:py-6">

        {/* Stats bar */}
        <div className="mb-3 sm:mb-4 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-400">
            {loading ? (
              <span className="animate-pulse text-slate-500">Searching…</span>
            ) : (
              <>
                <span className="text-slate-200 font-semibold">{total.toLocaleString()}</span>{" "}
                songs found
              </>
            )}
          </span>
          <span className="text-slate-500">
            Page {page} / {totalPages.toLocaleString()}
          </span>
        </div>

        {/* ── Card list (mobile) ── */}
        <div className="sm:hidden space-y-2">
          {!loading && songs.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">🔍</span>
                <span>No songs found</span>
              </div>
            </div>
          )}
          {songs.map((song, i) => (
            <div
              key={`card-${song.Cantor}-${song.Musica}-${i}`}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] active:bg-violet-500/10 transition-colors"
            >
              <span className="text-xs text-slate-600 tabular-nums pt-0.5 w-6 shrink-0 text-right">
                {(page - 1) * perPage + i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {song.Cantor || <span className="text-slate-600 italic">—</span>}
                </p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{song.Musica}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table (sm+) ── */}
        <div className="hidden sm:block rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02] shadow-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-12">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Artist</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Song</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {!loading && songs.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🔍</span>
                      <span>No songs found</span>
                    </div>
                  </td>
                </tr>
              )}
              {songs.map((song, i) => (
                <tr
                  key={`row-${song.Cantor}-${song.Musica}-${i}`}
                  className="group hover:bg-violet-500/5 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-slate-600 tabular-nums text-xs">
                    {(page - 1) * perPage + i + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                    {song.Cantor || <span className="text-slate-600 italic">—</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{song.Musica}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading spinner */}
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
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs sm:text-sm"
            >
              ← <span className="hidden sm:inline">Prev</span>
            </button>

            {pageNumbers().map((p, idx) =>
              p === "…" ? (
                <span key={`ellipsis-${idx}`} className="px-1.5 sm:px-2 text-slate-600 text-sm">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goTo(p as number)}
                  className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition border ${p === page
                      ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Next</span> →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
