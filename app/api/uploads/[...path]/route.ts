import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = path.join(process.cwd(), 'uploads', ...params.path)
    
    // Security check - prevent path traversal
    if (filePath.includes('..')) {
      return new NextResponse('Invalid path', { status: 400 })
    }

    const data = fs.readFileSync(filePath)
    
    // Set appropriate headers
    const ext = path.extname(filePath).toLowerCase()
    let contentType = 'application/octet-stream'
    
    if (ext === '.png') contentType = 'image/png'
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
    if (ext === '.gif') contentType = 'image/gif'
    if (ext === '.webp') contentType = 'image/webp'

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    return new NextResponse('File not found', { status: 404 })
  }
}
