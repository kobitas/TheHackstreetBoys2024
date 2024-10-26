import { Search, FileText, Key, Link2, Home, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ContentCard {
    title: string;
    date: string;
    description: string;
    members: string[];
}

function getMockContentCards(): ContentCard[] {
    return [
        {
            title: "Projektplanung 2024",
            date: "26.10.2024",
            description: "Ersten Paar Zeilen Inhalt. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo...",
            members: ["Julian Damm", "David Sayk", "+3 Weitere"]
        },
        {
            title: "Marketing Strategie",
            date: "25.10.2024",
            description: "Überarbeitung der Social Media Strategie für Q4. Fokus auf neue Produkteinführung und Verbesserung der Kundeninteraktion auf allen Kanälen...",
            members: ["Sarah Meyer", "Thomas Berg", "+2 Weitere"]
        },
        {
            title: "Quartalsbericht Q3",
            date: "24.10.2024",
            description: "Zusammenfassung der Geschäftsergebnisse für das dritte Quartal. Analyse der KPIs und Vorbereitung der Präsentation für das Management Meeting...",
            members: ["Michael Schmidt", "Lisa Weber", "+4 Weitere"]
        },
    ];
}

export default function HomePage() {
    const contentCards = getMockContentCards();

    return (
        <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-lg"></div>
                <h1 className="text-2xl text-white font-semibold">Organisation</h1>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Input 
                    placeholder="Suche nach..."
                    className="bg-white/10 border-none text-white pl-4 pr-12"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-8">
                <button className="flex flex-col items-center justify-center p-4 bg-blue-600 rounded-lg">
                    <FileText className="w-6 h-6 text-white mb-2" />
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-blue-600 rounded-lg">
                    <Key className="w-6 h-6 text-white mb-2" />
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-blue-600 rounded-lg">
                    <Link2 className="w-6 h-6 text-white mb-2" />
                </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-4">
                <h2 className="text-white text-sm">Zuletzt Bearbeitet:</h2>
                
                {/* Content Cards */}
                {contentCards.map((card, index) => (
                    <div key={index} className="bg-white/10 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-medium">{card.title}</h3>
                            <span className="text-sm text-gray-400">{card.date}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">
                            {card.description}
                        </p>
                        <p className="text-sm text-gray-400">
                            Mitarbeitende: {card.members.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
