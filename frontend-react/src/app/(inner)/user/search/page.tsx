'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UploadFileModal } from '@/components/modals/UploadFileModal'
import { SearchResults, SearchResult } from '@/components/SearchResults'
import { SearchSummary } from '@/components/search-summary'
import { Search } from 'lucide-react'
import { theme } from "@/lib/theme"

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
    <div className={`w-full max-w-[95%] mx-auto px-2 sm:px-4 py-4 ${theme.colors.background}`}>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Suche nach..."
            className={`
              w-full px-4 py-3 pr-12
              bg-white 
              rounded-lg
              ${theme.typography.paragraph}
              text-[#001E27]
              border-none
              shadow-[0px_4px_16px_0px_rgba(255,255,255,0.1)]
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#78D1F2]
            `}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6" 
            color="#001E27"
          />
        </div>

        <Button 
          onClick={handleSearch} 
          disabled={isSearching}
          className={`
            ${theme.typography.buttonText}
            rounded-lg
            min-w-[120px]
            h-[50px]
            bg-[#5D41EC]
            text-white
            hover:bg-[#5D41EC]/90
            shadow-[0px_4px_16px_0px_rgba(93,65,236,0.2)]
            px-6
          `}
        >
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>


      {/* Search Results */}
      {hasSearched && !isSearching && (
        <>
          {searchResults.length === 0 ? (
            <div className={`
              text-center mt-8
              ${theme.typography.paragraph}
              ${theme.colors.textLight}
            `}>
              No results found for &ldquo;{searchQuery}&ldquo;
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
