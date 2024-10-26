"use client"

import { useState } from 'react'
import FileDropzone from "@/components/file-dropzone"
import { FileText, Loader2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DuplicateFileModal } from '@/components/duplicate-file-modal'

export default function AddPage() {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showDuplicateModal, setShowDuplicateModal] = useState(false)
    const [duplicateFile, setDuplicateFile] = useState<{name: string, path: string} | null>(null)

    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter((file) => file !== fileToRemove))
    }

    const handleUpload = async () => {
        if (files.length === 0) return

        try {
            setIsLoading(true)
            const formData = new FormData()
            
            files.forEach(file => {
                formData.append('files', file)
            })

            // First check for duplicates
            const checkResponse = await fetch('/api/check-duplicates', {
                method: 'POST',
                body: formData,
            })

            // const checkResult = await checkResponse.json()

            const checkResult = {
                hasDuplicate: true,
                fileName: "example.pdf",
                filePath: "/documents/example.pdf"
            }

            if (checkResult.hasDuplicate) {
                setDuplicateFile({
                    name: checkResult.fileName,
                    path: checkResult.filePath
                })
                setShowDuplicateModal(true)
                setIsLoading(false)
                return
            }

            // If no duplicates, proceed with upload
            await uploadFiles()

        } catch (error) {
            console.error('Fehler beim Hochladen:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const uploadFiles = async (ignoreDuplicates = false) => {
        const formData = new FormData()
        files.forEach(file => {
            formData.append('files', file)
        })
        
        if (ignoreDuplicates) {
            formData.append('ignoreDuplicates', 'true')
        }

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })



        if (response.ok) {
            setFiles([])
            setShowDuplicateModal(false)
        } else {
            setShowDuplicateModal(true)
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center px-4 pt-8">
            {/* Title */}
            <h1 className="text-white text-xl font-bold mb-12">
                DATEI HOCHLADEN
            </h1>

            {/* Upload Box */}
            <FileDropzone
                files={files}
                setFiles={setFiles}
                acceptedFileTypes={{
                    'application/pdf': ['.pdf'],
                    'text/plain': ['.txt'],
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                }}
                className="w-full aspect-square max-w-[240px] bg-white rounded-lg"
            >
                {files.length > 0 ? (
                    <div className="h-full p-4 overflow-y-auto">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between rounded bg-gray-100 p-2 mb-2">
                                <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    <p className="text-sm text-gray-600 truncate">{file.name}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile(file)
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-violet-600"
                        >
                            <path
                                d="M12 4v12m0-12l-4 4m4-4l4 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                )}
            </FileDropzone>

            {/* Upload Button */}
            <Button 
                className="mt-6 w-full max-w-[240px]"
                onClick={handleUpload}
                disabled={files.length === 0 || isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wird hochgeladen...
                    </>
                ) : (
                    <>
                        <Upload className="mr-2 h-4 w-4" />
                        Hochladen
                    </>
                )}
            </Button>

            {duplicateFile && (
                <DuplicateFileModal
                    isOpen={showDuplicateModal}
                    onClose={() => setShowDuplicateModal(false)}
                    fileName={duplicateFile.name}
                    filePath={duplicateFile.path}
                    onUploadAnyway={() => uploadFiles(true)}
                />
            )}
        </div>
    );
}
