import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const artist = searchParams.get("artist")?.trim() ?? "";
    const song = searchParams.get("song")?.trim() ?? "";
    const mode = searchParams.get("mode") === "prefix" ? "prefix" : "anywhere";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") ?? "50", 10)));

    const offset = (page - 1) * per_page;
    const db = getDb();

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (artist) {
        conditions.push("Cantor LIKE ?");
        params.push(mode === "prefix" ? `${artist}%` : `%${artist}%`);
    }
    if (song) {
        conditions.push("Musica LIKE ?");
        params.push(mode === "prefix" ? `${song}%` : `%${song}%`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRow = db
        .prepare(`SELECT COUNT(*) as total FROM karaoke ${where}`)
        .get(...params) as { total: number };

    const total = countRow.total;
    const total_pages = Math.ceil(total / per_page);

    const songs = db
        .prepare(`SELECT Cantor, Musica FROM karaoke ${where} ORDER BY Cantor, Musica LIMIT ? OFFSET ?`)
        .all(...params, per_page, offset);

    return NextResponse.json({ songs, total, page, per_page, total_pages });
}
