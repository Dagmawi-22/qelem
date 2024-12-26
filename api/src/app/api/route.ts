// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    trending: [
      {
        channel: "ebs tv",
        link: "https://ebstv.tv",
        upcoming: [
          {
            program: "Seifu on ebs",
            localTime: new Date(),
            intTime: new Date(),
          },
        ],
      },
    ],
    news: [
      {
        channel: "ebs tv",
        link: "https://ebstv.tv",
        upcoming: [
          {
            program: "Seifu on ebs",
            localTime: new Date(),
            intTime: new Date(),
          },
        ],
      },
    ],
  };
  return NextResponse.json({
    data,
  });
}
