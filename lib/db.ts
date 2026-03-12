import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
    if (!db) {
        const dbPath = path.resolve(process.cwd(), "data/karaoke.db");
        db = new Database(dbPath, { readonly: true });
    }
    return db;
}

export interface Song {
    Cantor: string;
    Musica: string;
    DOHGA: string;
    PV: string;
    ATUALIZACAO: string;
    CK: string;
    Romaji: string;
    musica_numerica: string;
    cantor_numerico: string;
}

export interface SongsResult {
    songs: Song[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}
