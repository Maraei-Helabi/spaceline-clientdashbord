/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
// @ts-nocheck

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.has("title")
      ? searchParams.get("title")?.substring(0, 100)
      : "Starlink Subscription Management";

    const image = await fetch(new URL("./logo-new.png", import.meta.url)).then(
      (res) => res.arrayBuffer()
    );

    return new ImageResponse(
      (
        <>
          <div tw="flex flex-col items-center justify-center h-screen w-full bg-green-50/50">
            <img
              src={image}
              alt=""
              width={200}
              height={200}
              tw="rounded-md shadow-md"
            />
            <h1 tw="text-4xl font-extrabold">{title}</h1>
          </div>
        </>
      )
    );
  } catch {
    return new Response("failed to load og image", { status: 500 });
  }
}
