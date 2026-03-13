import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getPlaylist } from "@/lib/playlists";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const artist = searchParams.get("artist")?.trim() ?? "";
    const song = searchParams.get("song")?.trim() ?? "";
    const playlistId = searchParams.get("playlist")?.trim() ?? "";
    const mode = searchParams.get("mode") === "prefix" ? "prefix" : "anywhere";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") ?? "50", 10)));

    const offset = (page - 1) * per_page;
    const db = getDb();

    const conditions: string[] = [];
    const params: (string | number)[] = [];
    
    let orderByClause = "ORDER BY Cantor, Musica";

    if (playlistId) {
        const playlist = getPlaylist(playlistId);
        if (playlist) {
            const playlistConditions: string[] = [];
            if (playlist.artists && playlist.artists.length > 0) {
                playlistConditions.push(`Cantor IN (${playlist.artists.map(() => "?").join(",")})`);
                params.push(...playlist.artists);
            }
            if (playlist.codes && playlist.codes.length > 0) {
                playlistConditions.push(`DOHGA IN (${playlist.codes.map(() => "?").join(",")})`);
                params.push(...playlist.codes);
                
                // If there are specific codes, order by the exact sequence they were defined in.
                const caseStatements = playlist.codes.map((c, i) => `WHEN '${c}' THEN ${i + 1}`).join(" ");
                orderByClause = `ORDER BY CASE DOHGA ${caseStatements} ELSE 9999 END, Cantor, Musica`;
            }
            
            if (playlistConditions.length > 0) {
                conditions.push(`(${playlistConditions.join(" OR ")})`);
            } else {
                conditions.push("1=0");
            }
        } else {
            // If invalid playlist, return empty results
            conditions.push("1=0");
        }
    } else {
        if (artist) {
            conditions.push("Cantor LIKE ?");
            params.push(mode === "prefix" ? `${artist}%` : `%${artist}%`);
        }
        if (song) {
            conditions.push("Musica LIKE ?");
            params.push(mode === "prefix" ? `${song}%` : `%${song}%`);
        }
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRow = db
        .prepare(`SELECT COUNT(*) as total FROM karaoke ${where}`)
        .get(...params) as { total: number };

    const total = countRow.total;
    const total_pages = Math.ceil(total / per_page);

    const songs = db
        .prepare(`SELECT Cantor, Musica, DOHGA FROM karaoke ${where} ${orderByClause} LIMIT ? OFFSET ?`)
        .all(...params, per_page, offset);

    return NextResponse.json({ songs, total, page, per_page, total_pages });
}
