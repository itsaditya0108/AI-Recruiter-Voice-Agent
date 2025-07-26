import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";

export async function POST(req) {

    const { conversation } = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{converstation}}', JSON.stringify(conversation))

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