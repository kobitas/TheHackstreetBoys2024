import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
    try {
        const { imageUrl } = await request.json()

        if (!imageUrl) {
            return NextResponse.json(
                { error: 'Image URL is required' },
                { status: 400 }
            )
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: [
                        {
                            type: "text",
                            text: `Analysiere den Inhalt des Bildes. Erstelle ein JSON-Objekt mit folgender Struktur:
                                  json { "topic": string, "summary": string, keywords: string array with keywords, "probability": number} 
                                  Erfasse alle sichtbaren Keywords und relevanten Informationen präzise im JSON-Format auf Deutsch. 
                                  Beachte dabei folgende Punkte: 
                                  1. Das Feld "summary" soll eine kurze Zusammenfassung der wichtigsten Erkenntnisse und relevanten Informationen enthalten. 
                                  2. Das Feld "keywords" darf maximal drei Keywords enthalten.
                                  3. Die Wahrscheinlichkeit (probability) sollte als Dezimalzahl zwischen 0 und 1 angegeben werden.`
                        }
                    ]
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl
                            }
                        }
                    ]
                }
            ],
            response_format: { type: "json_object" }
        })

        console.log(response.choices[0].message.content)

        return NextResponse.json({ 
            analysis: response.choices[0].message.content 
        })

    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to generate analysis' },
            { status: 500 }
        )
    }
}
