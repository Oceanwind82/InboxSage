import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
})

export { openai }

export async function generateEmailReply(
  emailContent: string,
  context?: string,
  tone: 'professional' | 'friendly' | 'formal' = 'professional'
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured')
  }

  try {
    const systemPrompt = `You are a professional email assistant that helps generate thoughtful, well-structured email replies. 
    Generate a ${tone} response to the given email. 
    ${context ? `Additional context: ${context}` : ''}
    Keep the response concise, helpful, and appropriate for business communication.
    Maintain a professional yet personable tone and ensure the reply addresses the key points from the original email.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using cheaper model temporarily
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Please generate a reply to this email:\n\n${emailContent}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a reply.'
  } catch (error) {
    console.error('Error generating email reply:', error)
    throw new Error('Failed to generate email reply')
  }
}
