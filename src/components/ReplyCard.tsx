'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ReplyCardProps {
  originalEmail: string
  generatedReply: string
  onRegenerateReply: () => void
  isGenerating?: boolean
}

export default function ReplyCard({ 
  originalEmail, 
  generatedReply, 
  onRegenerateReply,
  isGenerating = false 
}: ReplyCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Original Email</h3>
        <div className="bg-gray-50 rounded-md p-4 border-l-4 border-gray-300">
          <p className="text-gray-700 whitespace-pre-wrap">{originalEmail}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Generated Reply</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={onRegenerateReply}
              disabled={isGenerating}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Regenerate'}
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-md p-4 border-l-4 border-blue-400">
          {isGenerating ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Generating reply...</span>
            </div>
          ) : (
            <p className="text-blue-800 whitespace-pre-wrap">{generatedReply}</p>
          )}
        </div>
      </div>
    </div>
  )
}
