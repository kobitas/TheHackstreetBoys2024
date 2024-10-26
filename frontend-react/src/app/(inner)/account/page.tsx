import { Search, Home, Plus, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountPage() {
    return (
        <div className="flex flex-col h-full p-4">
            {/* Header */}
            <h1 className="text-2xl text-white font-bold mb-8">ACCOUNT DETAILS</h1>

            {/* Account Details Card */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
                {/* Name Field */}
                <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-1 block">Name</label>
                    <div className="relative">
                        <Input
                            placeholder="Alexander Herrmann"
                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                        />
                        <Edit2 className="w-4 h-4 text-blue-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-1 block">E-Mail</label>
                    <div className="relative">
                        <Input
                            placeholder="a.herrmann@gmail.com"
                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                        />
                        <Edit2 className="w-4 h-4 text-blue-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-1 block">Telefonnummer</label>
                    <div className="relative">
                        <Input
                            placeholder="+49 (0) 123456789"
                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                        />
                        <Edit2 className="w-4 h-4 text-blue-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Birthday Field */}
                <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-1 block">Geburtsdatum</label>
                    <div className="relative">
                        <Input
                            placeholder="07.08.2003"
                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                        />
                        <Edit2 className="w-4 h-4 text-blue-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <Button 
                variant="default" 
                className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
            >
                Abmelden
            </Button>

            <Button 
                variant="default" 
                className="w-full bg-blue-900 hover:bg-blue-950"
            >
                Account löschen
            </Button>
        </div>
    );
}
