import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const mode = searchParams.get("mode") === "prefix" ? "prefix" : "anywhere";

    if (!q) return NextResponse.json({ artists: [] });

    const db = getDb();
    const pattern = mode === "prefix" ? `${q}%` : `%${q}%`;

    const results = db
        .prepare(
            `SELECT DISTINCT Cantor FROM karaoke
       WHERE Cantor LIKE ? AND Cantor IS NOT NULL AND Cantor != ''
       ORDER BY Cantor
       LIMIT 10`
        )
        .all(pattern) as { Cantor: string }[];

    return NextResponse.json({ artists: results.map((r) => r.Cantor) });
}
