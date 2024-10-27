'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import FileDropzone from "@/components/file-dropzone"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react"
import { pb } from '@/lib/pocketbase'
import { storeDocument } from '@/lib/qdrant'

interface UploadFileModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ImageAnalysis {
  topic: string;
  summary: string;
  keywords: string[];
  probability: number;
}

export function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
  const [files, setFiles] = useState<File[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [fileProgress, setFileProgress] = useState<{ [key: string]: number }>([])
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null)

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  const generateImageSummary = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      const data = await response.json()
      return data.analysis  // Changed from data.summary to data.analysis
    } catch (error) {
      console.error('Error generating summary:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const file = files[0]

      // Create FormData instance
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', file)
      
      setFileProgress({ [file.name]: 0 })
      
      // First create the record
      const record = await pb.collection('posts').create(formData)
      
      // Construct the image URL
      const imageUrl = `https://hackathon-fulda.pockethost.io/api/files/${record.collectionId}/${record.id}/${record.image}`
      console.log('Image URL:', imageUrl)

      // Generate summary using API route
      // {"topic":"Recruitment Flyer","summary":"Der Flyer wirbt für kaleidos","keywords":["kaleidos:code","Join now","Entwickler*innen"],"probability":0.9}
      const analysisResponse = await generateImageSummary(imageUrl)
      if (analysisResponse) {
        const analysis = JSON.parse(analysisResponse)
        setAnalysis(analysis)
        
        // Update the record with AI analysis
        const updateData = {
          ai_topic: analysis.topic,
          ai_summary: analysis.summary,
          ai_keywords: analysis.keywords, // Convert array to comma-separated string
          ai_probability: analysis.probability,
        }
        
        // Update the record with AI data
        await pb.collection('posts').update(record.id, updateData)

        const analysisWithImageUrl = { ...analysis, imageUrl: imageUrl, id: record.id };
        console.log('Analysis:', analysisWithImageUrl)

        // Store the document in Qdrant
        await storeDocument(analysisWithImageUrl);
      }
      
      setIsSuccess(true)

      // Reset form after short delay
      setTimeout(() => {
        setFiles([])
        setTitle('')
        setDescription('')
        setFileProgress({})
        setIsSuccess(false)
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 size={64} className="mb-4 text-green-500" />
            <h2 className="mb-2 text-2xl font-semibold">Upload successful!</h2>
            <p className="text-center text-gray-600">Your files have been successfully uploaded.</p>
            <Button onClick={onClose} className="mt-6">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <FileDropzone
                  files={files}
                  setFiles={setFiles}
                  acceptedFileTypes={{
                    'application/pdf': ['.pdf'],
                    'text/plain': ['.txt'],
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                  }}
                  className="rounded-lg border-2 border-dashed border-gray-300 p-4"
                >
                  <div className="text-center">
                    {files.length > 0 ? (
                      <div className="max-h-40 cursor-pointer space-y-2 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between rounded bg-gray-100 p-2">
                            <div className="mr-2 flex min-w-0 flex-1 items-center">
                              {fileProgress[file.name] ? (
                                <Progress value={fileProgress[file.name]} className="w-full" />
                              ) : isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <FileText className="mr-2 h-4 w-4 shrink-0" />
                              )}
                              <p className="truncate text-sm text-gray-600">{file.name}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0"
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
                      <p className="text-sm text-gray-600">
                        Drag and drop files here, or click to select files
                      </p>
                    )}
                  </div>
                </FileDropzone>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter file title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter file description"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
