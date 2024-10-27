'use client'

export interface SearchResult {
    id: number
    payload: {
        id: string
        imageUrl: string
        keywords: string[]
        probability: number
        summary: string
        topic: string
    }
    score: number
    version: number
}

interface SearchResultsProps {
    results: SearchResult[]
}

export function SearchResults({ results }: SearchResultsProps) {
    return (
        <div className="space-y-6">
            {results.map((result) => (
                <div
                    key={result.payload.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-48 h-48">
                            <a 
                                href={result.payload.imageUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={result.payload.imageUrl}
                                    alt={result.payload.topic}
                                    className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                />
                            </a>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {result.payload.topic}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Score: {(result.score * 100).toFixed(1)}%
                                </span>
                            </div>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {result.payload.summary}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {result.payload.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
