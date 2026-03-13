import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const mode = searchParams.get("mode") === "prefix" ? "prefix" : "anywhere";

    if (!q) return NextResponse.json({ songs: [] });

    const db = getDb();
    const pattern = mode === "prefix" ? `${q}%` : `%${q}%`;

    const results = db
        .prepare(
            `SELECT DISTINCT Musica FROM karaoke
       WHERE Musica LIKE ? AND Musica IS NOT NULL AND Musica != ''
       ORDER BY Musica
       LIMIT 10`
        )
        .all(pattern) as { Musica: string }[];

    return NextResponse.json({ songs: results.map((r) => r.Musica) });
}
