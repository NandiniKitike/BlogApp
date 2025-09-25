import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

// ✅ FIXED: Updated for Next.js 15 - params is now async
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> } // ✅ Promise wrapper
) {
  try {
    // ✅ FIXED: Await params before using
    const { path: pathSegments } = await params
    
    const filePath = path.join(process.cwd(), 'uploads', ...pathSegments)
    
    // Security check - prevent path traversal
    if (filePath.includes('..')) {
      return new NextResponse('Invalid path', { status: 400 })
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    const data = fs.readFileSync(filePath)
    
    // Set appropriate headers
    const ext = path.extname(filePath).toLowerCase()
    let contentType = 'application/octet-stream'
    
    if (ext === '.png') contentType = 'image/png'
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
    if (ext === '.gif') contentType = 'image/gif'
    if (ext === '.webp') contentType = 'image/webp'
    if (ext === '.svg') contentType = 'image/svg+xml'

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('File serving error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
