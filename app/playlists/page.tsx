import { PLAYLISTS } from "@/lib/playlists";
import Link from "next/link";

export default function PlaylistsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-slate-200 font-sans p-6 sm:p-10 animate-fade-in">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="flex items-center gap-4 mb-10">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition group cursor-pointer">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Recommended Playlists
          </h1>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLAYLISTS.map(playlist => (
            <Link 
              key={playlist.id} 
              href={`/?playlist=${playlist.id}`}
              className="group block rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-900/20"
            >
              {/* Cover Gradient */}
              <div className={`h-32 sm:h-40 w-full bg-gradient-to-br ${playlist.coverColor} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                {/* Decorative icon based on ID */}
                <div className="relative z-10 text-5xl sm:text-6xl drop-shadow-lg opacity-90 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  {playlist.id === "pop-divas" ? "✨" : 
                   playlist.id === "rock-classics" ? "🎸" :
                   playlist.id === "brasil-sertanejo" ? "🤠" :
                   playlist.id === "br-pagode" ? "🥁" : 
                   playlist.id === "disney" ? "🏰" :
                   playlist.id === "naruto" ? "🍥" :
                   playlist.id === "br-hits" ? "🇧🇷" :
                   playlist.id === "k-pop" ? "🫰" : "💿"}
                </div>
              </div>
              
              {/* Info */}
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-2">{playlist.name}</h2>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                  {playlist.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                    {playlist.artists.length} Artists
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
