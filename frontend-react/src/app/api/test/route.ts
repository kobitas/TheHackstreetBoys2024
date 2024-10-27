import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "How are you?"
        }
      ],
    })

    return NextResponse.json({ response: completion.choices[0].message.content })
  } catch (error: any) {
    console.error('Detailed Error:', {
      message: error.message,
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
