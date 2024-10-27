import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DuplicateFileModalProps {
    isOpen: boolean
    onClose: () => void
    fileName: string
    filePath: string
    onUploadAnyway: () => void
}

export function DuplicateFileModal({ isOpen, onClose, fileName, filePath, onUploadAnyway }: DuplicateFileModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Duplicate File Detected</DialogTitle>
                </DialogHeader>
                <p>A file with the name &quot;{fileName}&quot; already exists at &quot;{filePath}&quot;.</p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onUploadAnyway}>Upload Anyway</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
