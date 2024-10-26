import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Settings, Info, Plus } from "lucide-react"
import Link from "next/link"

export default function OrganisationPage() {
  return (
    <div className="flex flex-col p-4 h-full bg-slate-900">
      {/* Header */}
      <h1 className="text-xl font-bold text-white mb-6 text-center">ORGANISATIONEN</h1>

      {/* Organization Cards */}
      <div className="space-y-3">
        <Card className="bg-white/10 backdrop-blur-lg border-none">
          <Link href="/organisation/1" className="flex items-center justify-between p-4">
            <span className="text-white">Schülervertretung Fulda</span>
            <Settings className="w-5 h-5 text-blue-500" />
          </Link>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-none">
          <Link href="/organisation/2" className="flex items-center justify-between p-4">
            <span className="text-white">FFW Petersberg</span>
            <Info className="w-5 h-5 text-blue-500" />
          </Link>
        </Card>
      </div>

      {/* New Organization Button */}
      <div className="mt-20 mb-16">
        <Button 
          variant="outline" 
          className="w-full bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue Organisation
        </Button>
      </div>
    </div>
  )
}
