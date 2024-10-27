import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { QdrantClient } from '@qdrant/js-client-rest'

const COLLECTION_NAME = "hackathon"

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
        const { query, limit = 5 } = await request.json()

        if (!query) {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            )
        }
        console.log('Search Query API reached:', query)

        // Get embedding for the search query
        const searchVector = await getEmbedding(query)

        // Search Qdrant with the query vector
        const searchResult = await qdrantClient.search(COLLECTION_NAME, {
            vector: searchVector,
            limit: limit,
            with_payload: true,
            with_vector: false, // Usually not needed in the response
        })

        console.log("Search Result Embedding:", JSON.stringify(searchResult, null, 2));

        // Filter results where score is over 0.77
        const filteredResults = searchResult.filter(
            result => result.score > 0.75
        )

        console.log("Filtered Results:", JSON.stringify(filteredResults, null, 2));

        return NextResponse.json({
            success: true,
            results: filteredResults
        })

    } catch (error) {
        console.error('Error searching documents:', error)
        return NextResponse.json(
            { 
                error: 'Failed to search documents',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
