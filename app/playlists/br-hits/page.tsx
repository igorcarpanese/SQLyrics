"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAZILIAN_ARTISTS } from "@/lib/playlists";

type ViewMode = "alphabetical" | "genre";

export default function BrHitsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("alphabetical");

  // Alphabetical sort
  const alphabeticalArtists = [...BRAZILIAN_ARTISTS].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Group by genre
  const groupedByGenre = BRAZILIAN_ARTISTS.reduce((acc, artist) => {
    if (!acc[artist.genre]) acc[artist.genre] = [];
    acc[artist.genre].push(artist);
    return acc;
  }, {} as Record<string, typeof BRAZILIAN_ARTISTS>);

  // Sort genres and their artists
  Object.keys(groupedByGenre).forEach((genre) => {
    groupedByGenre[genre].sort((a, b) => a.name.localeCompare(b.name));
  });
  const genresSorted = Object.keys(groupedByGenre).sort((a, b) => a.localeCompare(b));

  const modeToggle = (
    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto relative mb-8">
      <div
        className="absolute top-1 bottom-1 rounded-lg bg-violet-600 shadow-lg shadow-violet-500/30 transition-all duration-300 ease-in-out"
        style={{
          left: viewMode === "alphabetical" ? "4px" : "50%",
          right: viewMode === "alphabetical" ? "50%" : "4px",
        }}
      />
      <button
        onClick={() => setViewMode("alphabetical")}
        className={`relative z-10 flex-1 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${
          viewMode === "alphabetical" ? "text-white" : "text-slate-400 hover:text-slate-300"
        }`}
      >
        A-Z (Alfabética)
      </button>
      <button
        onClick={() => setViewMode("genre")}
        className={`relative z-10 flex-1 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 ${
          viewMode === "genre" ? "text-white" : "text-slate-400 hover:text-slate-300"
        }`}
      >
        Por Gênero
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a14] text-slate-200 font-sans p-6 sm:p-10 animate-fade-in">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/playlists"
              className="p-2 -ml-2 rounded-full hover:bg-white/10 transition group cursor-pointer shrink-0"
              title="Voltar"
            >
              <svg
                className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                Músicas Brasileiras
              </h1>
              <p className="text-slate-400 text-sm">
                Do axé ao funk, escolha um artista para ver suas músicas.
              </p>
            </div>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          {modeToggle}
        </div>

        {/* Grid (Alphabetical) */}
        {viewMode === "alphabetical" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in-up">
            {alphabeticalArtists.map((artist) => (
              <Link
                key={artist.name}
                href={`/?artist=${encodeURIComponent(artist.name)}`}
                className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-violet-600/20 hover:border-violet-500/50 transition-all hover:scale-[1.02] flex flex-col justify-center"
              >
                <span className="font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">
                  {artist.name}
                </span>
                <span className="text-[10px] mt-1 text-slate-500 uppercase tracking-wider font-medium group-hover:text-violet-400/70">
                  {artist.genre}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Grid (By Genre) */}
        {viewMode === "genre" && (
          <div className="space-y-12 animate-fade-in-up">
            {genresSorted.map((genre) => (
              <div key={genre}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2 inline-block">
                  {genre}
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {groupedByGenre[genre].map((artist) => (
                    <Link
                      key={artist.name}
                      href={`/?artist=${encodeURIComponent(artist.name)}`}
                      className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-violet-600/20 hover:border-violet-500/50 transition-all hover:scale-[1.02] flex items-center"
                    >
                      <span className="font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">
                        {artist.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
