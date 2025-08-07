import { NextRequest, NextResponse } from 'next/server'
import { generateEmailReply } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    // Temporarily skip authentication to test AI functionality
    // TODO: Re-enable authentication once core features are working
    
    const { emailContent, context, tone } = await request.json()

    if (!emailContent) {
      return NextResponse.json(
        { error: 'Email content is required' },
        { status: 400 }
      )
    }

    // Generate the AI reply
    const reply = await generateEmailReply(emailContent, context, tone)

    return NextResponse.json({ 
      reply,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Generate reply API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate reply' },
      { status: 500 }
    )
  }
}

// GET method to check API health
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Generate reply API is working' 
  })
}
