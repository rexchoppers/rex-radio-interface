import { NextRequest, NextResponse } from 'next/server';
import { hmac_auth } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  const authResult = await hmac_auth(request);
  if (authResult) {
    return authResult;
  }

  return NextResponse.json({
    success: true,
    message: "Validation successful",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  const authResult = await hmac_auth(request);
  if (authResult) {
    return authResult;
  }

  return NextResponse.json({
    success: true,
    message: "Validation successful",
    timestamp: new Date().toISOString()
  });
}
