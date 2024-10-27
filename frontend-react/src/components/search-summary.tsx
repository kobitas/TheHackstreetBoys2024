import React, { useState, useEffect } from 'react'
import { SearchResult } from '@/components/SearchResults'

interface SummaryData {
  zusammenfassung: string
  highlights: {
    text: string
    imageUrl: string
    id: string
  }[]
}

interface SearchSummaryProps {
  results: SearchResult[]
  query: string
}

export const SearchSummary: React.FC<SearchSummaryProps> = ({ results, query }) => {
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (results.length > 0) {
      handleGetSummary()
    }
  }, [results, query])  // Run when results or query changes

  if (!results.length) return null

  const handleGetSummary = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results, query }),
      })

      const data = await response.json()
      if (data.summary) {
        const sumobject = JSON.parse(data.summary);
        setSummary(sumobject as SummaryData)
      }
    } catch (error) {
      console.error('Error getting summary:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
      <p>
        Found {results.length} result{results.length === 1 ? '' : 's'} 
        {query && ` for "${query}"`}
      </p>
      {summary && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="whitespace-pre-wrap">{summary.zusammenfassung}</p>
          
          {summary.highlights.length > 0 && (
            <ul className="mt-4 list-disc pl-4">
              {summary.highlights.map((highlight, index) => (
                <li key={highlight.id} className="mb-2">
                  {highlight.text}
                  <a 
                    href={highlight.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    [{index + 1}]
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
