import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import Image from "next/image"

interface DuplicateFileModalProps {
    isOpen: boolean
    onClose: () => void
    fileName: string
    filePath: string
    onUploadAnyway: () => void
}

export function DuplicateFileModal({ 
    isOpen, 
    onClose, 
    fileName, 
    filePath,
    onUploadAnyway 
}: DuplicateFileModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#001A1A] text-white p-6 max-w-sm mx-auto">
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-lg font-bold border border-white/20 rounded-lg px-4 py-2 w-full text-center">
                        {fileName}
                    </div>
                    
                    <Image 
                        src="/grass.png" 
                        alt="File preview" 
                        className="rounded-lg w-full aspect-video object-cover"
                        width={500}
                        height={280}
                    />
                    
                    <div className="text-center text-blue-500">
                        Duplikat gefunden
                    </div>
                    
                    <p className="text-center text-sm">
                        Die Datei <span className="text-blue-500">{fileName}</span> existiert 
                        schon im Verzeichnis <span className="text-blue-500">{filePath}</span>.
                    </p>
                    
                    <div className="flex gap-2 w-full">
                        <Button 
                            onClick={onUploadAnyway}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            Trotzdem hochladen
                        </Button>
                        <Button 
                            onClick={onClose}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            Hochladen abbrechen
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
