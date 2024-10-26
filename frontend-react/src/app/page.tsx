// import { ModeToggle } from "@/components/dark-mode-toggle";

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to our app</h1>
        <Link href="/home" passHref>
          <Button>
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}
