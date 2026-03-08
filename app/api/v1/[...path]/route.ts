import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const BACKEND_URL = "https://subtrackbackend-production.up.railway.app";

async function handler(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {

    const { path } = await params;
    const targetUrl = `${BACKEND_URL}/api/v1/${path.join("/")}${req.nextUrl.search}`;

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
        if (key !== "host" && key !== "content-length") {
            headers[key] = value;
        }
    });

    const hasBody = req.method !== "GET" && req.method !== "HEAD";

    let body: Buffer | undefined;
    if (hasBody) {
        const arrayBuffer = await req.arrayBuffer();
        body = Buffer.from(arrayBuffer);
        if (body.length > 0) {
            headers["content-length"] = String(body.length);
        }
    }

    let response: Response;
    try {
        response = await fetch(targetUrl, {
            method: req.method,
            headers,
            ...(hasBody && body && body.length > 0 ? { body } : {}),
        });
    } catch (err) {
        console.error("[PROXY] Fetch error:", err);
        return NextResponse.json({ error: "Upstream unreachable" }, { status: 502 });
    }

    const responseHeaders = new Headers();

    response.headers.forEach((value, key) => {

        if (key === "content-encoding") return;

        if (key === "set-cookie") {
            const cookies = response.headers.getSetCookie?.() ?? [value];
            cookies.forEach(cookie => {
                responseHeaders.append("set-cookie", cookie);
            });
            return;
        }

        responseHeaders.append(key, value);
    });


    const responseBody = await response.arrayBuffer();

    return new NextResponse(responseBody, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
    });
}

export const GET     = handler;
export const POST    = handler;
export const PUT     = handler;
export const PATCH   = handler;
export const DELETE  = handler;
export const OPTIONS = handler; 