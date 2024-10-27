"use client";
import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { pb } from '@/lib/pocketbase';
import { storeDocument } from '@/lib/qdrant';

interface ImageAnalysis {
  topic: string;
  summary: string;
  keywords: string[];
  probability: number;
}

export default function AddUserPage() {
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const keyFileInputRef = useRef<HTMLInputElement>(null);
  const linkFileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const generateImageSummary = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error('Error generating summary:', error);
      return null;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);

      // Create FormData instance
      const formData = new FormData();
      formData.append('image', file);
      
      // Create the record
      const record = await pb.collection('posts').create(formData);
      
      // Construct the image URL
      const imageUrl = `https://hackathon-fulda.pockethost.io/api/files/${record.collectionId}/${record.id}/${record.image}`;
      
      // Generate summary using API route
      const analysisResponse = await generateImageSummary(imageUrl);
      if (analysisResponse) {
        const analysis = JSON.parse(analysisResponse);
        // Update the record with AI analysis
        const updateData = {
          ai_topic: analysis.topic,
          ai_summary: analysis.summary,
          ai_keywords: analysis.keywords,
          ai_probability: analysis.probability,
        };
        
        // Update the record with AI data
        await pb.collection('posts').update(record.id, updateData);

        const analysisWithImageUrl = { ...analysis, imageUrl: imageUrl, id: record.id };
        
        // Store the document in Qdrant
        await storeDocument(analysisWithImageUrl);
      }
      
      setIsSuccess(true);
      
      // Reset after short delay
      setTimeout(() => {
        setIsSuccess(false);
        // Optionally redirect or show success message
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001524] p-8">
      {/* Purple pill/line */}
      <div className="w-32 h-2
       bg-accent rounded-full mb-4"></div>
      
      <h1 className="font-poppins font-semibold text-xl leading-normal text-white mb-12 text-center">Datei hochladen</h1>
      
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={mainFileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,.pdf,.txt"
      />
      <input
        type="file"
        ref={keyFileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,.pdf,.txt"
      />
      <input
        type="file"
        ref={linkFileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,.pdf,.txt"
      />

      {/* Main upload button with loading state */}
      <div 
        onClick={() => !isLoading && mainFileInputRef.current?.click()}
        className={`bg-white rounded-lg p-6 mb-2 cursor-pointer 
          transition-all duration-300 transform
          hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
          hover:scale-[1.02]
          w-full max-w-md mx-auto
          flex items-center justify-center
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-[#6C5DD3] animate-spin" />
        ) : (
          <svg 
            className="w-8 h-8 text-[#6C5DD3]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
        )}
      </div>

      {/* Success message */}
      {isSuccess && (
        <div className="text-center text-green-400 text-sm mb-4 max-w-md mx-auto">
          Upload erfolgreich!
        </div>
      )}

      {/* Bottom buttons container */}
      <div className="flex gap-4 justify-center max-w-md mx-auto">
        {/* Key button with enhanced glow effect */}
        <div 
          onClick={() => keyFileInputRef.current?.click()}
          className="bg-white rounded-lg p-6 flex-1 cursor-pointer
            transition-all duration-300 transform
            hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
            hover:scale-[1.02]
            flex items-center justify-center"
        >
          <svg 
            className="w-6 h-6 text-[#6C5DD3]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Link button with enhanced glow effect */}
        <div 
          onClick={() => linkFileInputRef.current?.click()}
          className="bg-white rounded-lg p-6 flex-1 cursor-pointer
            transition-all duration-300 transform
            hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
            hover:scale-[1.02]
            flex items-center justify-center"
        >
          <svg 
            className="w-6 h-6 text-[#6C5DD3]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
