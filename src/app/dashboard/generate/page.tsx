'use client'

import { useState } from 'react'
import ReplyCard from '@/components/ReplyCard'

export default function GenerateReplyPage() {
  const [emailContent, setEmailContent] = useState('')
  const [context, setContext] = useState('')
  const [tone, setTone] = useState<'professional' | 'friendly' | 'formal'>('professional')
  const [generatedReply, setGeneratedReply] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const generateReply = async () => {
    if (!emailContent.trim()) {
      setError('Please enter email content')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent,
          context: context || undefined,
          tone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setGeneratedReply(data.reply)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate reply')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Generate AI Reply
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Paste an email and let our AI generate a professional response for you.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email-content" className="block text-sm font-medium text-gray-700">
              Original Email Content *
            </label>
            <textarea
              id="email-content"
              rows={8}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste the email you want to reply to here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="context" className="block text-sm font-medium text-gray-700">
              Additional Context (Optional)
            </label>
            <textarea
              id="context"
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Provide any additional context that might help generate a better reply..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
              Tone
            </label>
            <select
              id="tone"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={tone}
              onChange={(e) => setTone(e.target.value as 'professional' | 'friendly' | 'formal')}
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div>
            <button
              onClick={generateReply}
              disabled={isGenerating || !emailContent.trim()}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Reply'}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Reply */}
      {(generatedReply || isGenerating) && (
        <ReplyCard
          originalEmail={emailContent}
          generatedReply={generatedReply}
          onRegenerateReply={generateReply}
          isGenerating={isGenerating}
        />
      )}
    </div>
  )
}
