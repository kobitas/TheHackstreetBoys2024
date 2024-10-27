// import { ModeToggle } from "@/components/dark-mode-toggle";

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="space-y-6 p-6">
        {/* Purple Pill */}
        <div className="w-24 h-3 rounded-full bg-indigo-500 mb-8" />
        
        <h1 className="text-3xl font-bold text-primary text-left">
          Herzlich Willkommen in
          <span className="text-indigo-500 block mt-1">Kontinuo</span>
        </h1>
        
        <div className="flex flex-col gap-3 max-w-[280px]">
          <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
            Anmelden
          </Button>
          
          <Button variant="outline" className="w-full">
            Registrieren
          </Button>
        </div>
      </div>
    </div>
  )
}
