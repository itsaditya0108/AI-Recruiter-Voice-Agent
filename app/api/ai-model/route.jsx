
import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from 'next/server';
const { default: OpenAI } = require("openai");

export async function POST(req) {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTION_PROMPT
        .replace('{{jobTitle}}', jobPosition)
        .replace('{{jobDescription}}', jobDescription)
        .replace('{{jobDuration}}', duration)
        .replace('{{type}}', type);

    console.log(FINAL_PROMPT);

    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
    });
    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                { role: "user", content: FINAL_PROMPT }
            ],
            response_format: 'json'
        });

        console.log("OpenAI Response:", completion.choices[0]?.message);

        return NextResponse.json(completion.choices[0]?.message);
    } catch (e) {
        console.error("Error occurred:", e);
        return NextResponse.json({ error: e.message || 'Something went wrong' });
    }
}
