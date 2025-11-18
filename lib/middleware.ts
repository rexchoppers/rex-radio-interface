import { NextRequest, NextResponse } from 'next/server';
import { verify_signature } from './hmac';

export async function hmac_auth(request: NextRequest): Promise<NextResponse | null> {
  const pathname = request.nextUrl.pathname;

  // Skip authentication for root or docs endpoints
  if (["/", "/docs", "/openapi.json"].includes(pathname)) {
    return null; // Continue to next handler
  }

  const signature = request.headers.get("x-signature");
  const timestamp = request.headers.get("x-timestamp");

  console.log(`Signature: ${signature}`);
  console.log(`Timestamp: ${timestamp}`);

  if (!signature || !timestamp) {
    console.log("Missing signature or timestamp");
    return NextResponse.json(
      { error: "Missing signature or timestamp" },
      { status: 401 }
    );
  }

  const method = request.method.toUpperCase();
  const path = pathname;

  // Only read body for non-GET requests
  let body = Buffer.from("");
  if (!["GET", "HEAD", "DELETE"].includes(method)) {
    try {
      const bodyText = await request.text();
      body = Buffer.from(bodyText);
    } catch (error) {
      console.error("Error reading body:", error);
    }
  }

  // Verify signature
  const secret = process.env.HMAC_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfiguration (missing HMAC secret)" },
      { status: 500 }
    );
  }

  if (!verify_signature(method, path, body, timestamp, signature, secret)) {
    console.log("Invalid or expired signature");
    return NextResponse.json(
      { error: "Invalid or expired signature" },
      { status: 401 }
    );
  }

  return null; // Continue to next handler
}
