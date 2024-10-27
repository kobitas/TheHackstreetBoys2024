'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UploadFileModal } from '@/components/modals/UploadFileModal'
import { SearchResults, SearchResult } from '@/components/SearchResults'
import { SearchSummary } from '@/components/search-summary'

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    try {
      setIsSearching(true)
      const response = await fetch('/api/vector-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      })
      const data = await response.json()
      setSearchResults(data.results || [])
      setHasSearched(true)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
      setHasSearched(true)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="w-full max-w-[95%] mx-auto px-2 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Explorer</h1>
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload file
        </Button>
      </div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search for projects, info, etc."
          className="flex-grow border rounded px-4 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="default" size="lg" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
        <Button variant="secondary" size="lg">Chat</Button>
      </div>
      {hasSearched && !isSearching && (
        <>
          {searchResults.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No results found for `&quot;`{searchQuery}`&quot;`
            </div>
          ) : (
            <>
              {searchQuery && <SearchSummary results={searchResults} query={searchQuery} />}
              <SearchResults results={searchResults} />
            </>
          )}
        </>
      )}
      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  )
}

export default SearchPage
