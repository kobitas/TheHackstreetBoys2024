// import { ModeToggle } from "@/components/dark-mode-toggle";

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Hackstreetboys!</h1>
        <Link href="/user/search" passHref>
          <Button>
            Go to User search
          </Button>
        </Link>
      </div>
    </div>
  )
}
