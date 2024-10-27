import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { results, query } = await request.json()

    const systemMessage = {
      role: "system" as const,
      content: `Du bist ein hilfreicher Assistent.  Fasse die folgenden Suchergebnisse prägnant auf Deutsch zusammen.
      Stelle sicher, dass deine Zusammenfassung informativ und leicht verständlich ist. Gib für jede Information die entsprechende Quelle als id an.
      Formatiere deine Antwort als JSON-Objekt mit folgender Struktur:
      {
            "zusammenfassung": "Deine Zusammenfassung hier",
            "highlights": [
                {
                    "text": "Hervorgehobener Text oder KPI",
                    "imageUrl": "Url des Bildes",
                    "id": "Id der Quelle"
                },
                ...
            ]
        }
      Stelle sicher, dass das JSON-Format korrekt ist und von einem JSON-Parser gelesen werden kann.`
    }

    const userMessage = {
      role: "user" as const,
      content: `Suchanfrage: "${query}"
      Ergebnisse: ${JSON.stringify(results, null, 2)}`
    }

    const completion = await openai.chat.completions.create({
      messages: [systemMessage, userMessage],
      model: "gpt-4o",
      response_format: {
        type: "json_object"
      }
    })

    const summary = completion.choices[0]?.message.content || '';
    console.log(summary)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Zusammenfassungsfehler:', error)
    return NextResponse.json(
      { error: 'Zusammenfassung konnte nicht erstellt werden' },
      { status: 500 }
    )
  }
}
