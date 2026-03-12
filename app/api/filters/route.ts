import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
    const db = getDb();

    const pvValues = db
        .prepare("SELECT DISTINCT PV FROM karaoke WHERE PV IS NOT NULL AND PV != '' ORDER BY PV")
        .all() as { PV: string }[];

    const ckValues = db
        .prepare("SELECT DISTINCT CK FROM karaoke WHERE CK IS NOT NULL AND CK != '' ORDER BY CK")
        .all() as { CK: string }[];

    return NextResponse.json({
        pvOptions: pvValues.map((r) => r.PV),
        ckOptions: ckValues.map((r) => r.CK),
    });
}
