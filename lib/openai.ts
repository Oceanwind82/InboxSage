import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export { openai }

export async function generateEmailReply(
  emailContent: string,
  context?: string,
  tone: 'professional' | 'friendly' | 'formal' = 'professional'
): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant that helps generate professional email replies. 
    Generate a ${tone} response to the given email. 
    ${context ? `Additional context: ${context}` : ''}
    Keep the response concise, helpful, and appropriate for business communication.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
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
