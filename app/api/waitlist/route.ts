import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const areas = new Set([
  "D1",
  "D2",
  "D4",
  "D6",
  "D7",
  "D8",
  "D9",
  "D12",
  "Rathmines",
  "Ranelagh",
  "Drumcondra",
  "Clontarf",
  "Sandymount",
  "Blackrock",
  "other"
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const area = String(body.area ?? "").trim();
    const activities = Array.isArray(body.activities)
      ? body.activities.map((activity) => String(activity)).filter(Boolean)
      : [];

    if (!firstName || !email || !area || activities.length === 0) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!email.includes("@") || !areas.has(area)) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const waitlist = await prisma.waitlist.create({
      data: {
        firstName,
        email,
        area,
        activities: JSON.stringify(activities)
      }
    });

    return NextResponse.json({ id: waitlist.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save waitlist submission." }, { status: 500 });
  }
}
