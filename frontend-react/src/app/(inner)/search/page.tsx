'use client';

import { useState } from 'react';
import { Search, FileText, Key, Link2, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from "date-fns";
import { de } from 'date-fns/locale';
import { cn } from "@/lib/utils";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [documentAuthor, setDocumentAuthor] = useState('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchData = {
      query: searchQuery,
      author: documentAuthor,
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
    };
    
    console.log('Search data being sent:', searchData);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      console.log('Response received:', data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-4 flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Suche nach ...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-16"
        />
        <Button 
          type="submit"
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-0 h-full w-16 hover:bg-blue-50"
        >
          <Search className="h-6 w-6" />
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 bg-blue-900 p-2 rounded-lg text-white justify-between">
        <Button variant="ghost" size="icon" className="flex-1 text-white hover:text-white hover:bg-blue-800">
          <FileText className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="flex-1 text-white hover:text-white hover:bg-blue-800">
          <Key className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="flex-1 text-white hover:text-white hover:bg-blue-800">
          <Link2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Author Input */}
      <Input
        type="text"
        placeholder="Dokumentenautor..."
        value={documentAuthor}
        onChange={(e) => setDocumentAuthor(e.target.value)}
      />

      {/* Date Range */}
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "PPP", { locale: de }) : "Von..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
              locale={de}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "PPP", { locale: de }) : "Bis..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
              locale={de}
            />
          </PopoverContent>
        </Popover>
      </div>
    </form>
  );
}
