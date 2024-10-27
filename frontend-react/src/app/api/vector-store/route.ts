import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { QdrantClient } from '@qdrant/js-client-rest'
import { VectorDocumentMeta } from '@/lib/qdrant'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_HOST,
    apiKey: process.env.QDRANT_API_KEY,
})

async function getEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
    })
    return response.data[0]?.embedding || []
}

export async function POST(request: Request) {
    try {
        const document: VectorDocumentMeta = await request.json()

        const text = JSON.stringify(document)
        console.log('Text:', text)
        const vector = await getEmbedding(text)
        console.log(`Document vector length: ${vector.length}`);

        const collectionInfo = await qdrantClient.getCollection("hackathon")
        console.log(`Collection Info: ${JSON.stringify(collectionInfo, null, 2)}`);
        const nextId = collectionInfo.points_count
        console.log('Next ID:', nextId)
        
        const point = {
            id: nextId as number,
            vector: vector,
            payload: document,
        }

        const result = await qdrantClient.upsert("hackathon", {
            points: [point],
        })

        return NextResponse.json({ 
            success: true, 
            id: nextId,
            result 
        })

    } catch (error) {
        console.error('Error storing document:', error)
        return NextResponse.json(
            { 
                error: 'Failed to store document',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
