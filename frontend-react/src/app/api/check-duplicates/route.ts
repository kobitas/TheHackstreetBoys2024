import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import os from 'os'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]
        const desktopPath = join(os.homedir(), 'Desktop')  // Changed to Desktop
        
        // Save files and collect their details
        const savedFiles = await Promise.all(files.map(async file => {
            // Convert File to ArrayBuffer
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            
            // Create path on desktop with unique name
            const filePath = join(desktopPath, `upload_${Date.now()}_${file.name}`)
            
            // Save file
            await writeFile(filePath, buffer)
            
            return {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                path: filePath
            }
        }))
        
        console.log('Saved files:', savedFiles)

        return NextResponse.json({ 
            hasDuplicate: false,
            files: savedFiles 
        })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to process files' },
            { status: 500 }
        )
    }
}
