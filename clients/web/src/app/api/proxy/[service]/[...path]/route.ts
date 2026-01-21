import { NextRequest, NextResponse } from "next/server";
import { config } from "@/config";

function baseUrl(service: string) {
  switch (service) {
    case "auth":
      return config.authBaseUrl;
    case "children":
      return config.childrenBaseUrl;
    case "attendance":
      return config.attendanceBaseUrl;
    case "tracking":
      return config.trackingBaseUrl;
    case "files":
      return config.filesBaseUrl;
    case "tutors":
      return config.tutorsBaseUrl;
    case "staff":
      return config.staffBaseUrl;
    default:
      return null;
  }
}

async function forward(
  req: NextRequest,
  ctx: { params: Promise<{ service: string; path: string[] }> }
) {
  // 🔴 CLAVE: await params
  const { service, path } = await ctx.params;

  const base = baseUrl(service);
  if (!base) {
    return NextResponse.json({ message: `Unknown service ${service}` }, { status: 400 });
  }

  const url = `${base}/${path.join("/")}`;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers),
    },
    body: req.method === "GET" ? undefined : await req.text(),
  });

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export async function GET(req: NextRequest, ctx: any) {
  return forward(req, ctx);
}
export async function POST(req: NextRequest, ctx: any) {
  return forward(req, ctx);
}
export async function PUT(req: NextRequest, ctx: any) {
  return forward(req, ctx);
}
export async function PATCH(req: NextRequest, ctx: any) {
  return forward(req, ctx);
}
export async function DELETE(req: NextRequest, ctx: any) {
  return forward(req, ctx);
}
