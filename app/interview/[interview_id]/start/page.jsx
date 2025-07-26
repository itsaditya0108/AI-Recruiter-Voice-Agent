'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web';
import AlertComponent from './AlertComponent';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

function StartInterview() {

    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY);
    const [activeUser, setActiveUser] = useState();
    const [conversation, setConversation] = useState();
    const { interview_id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState();

    useEffect(() => {
        interviewInfo && startCall();
    }, [interviewInfo])

    useEffect(() => {
        const handelMessage = (message) => {
            console.log('Message ', message)
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                console.log("Convo String :", convoString);
                setConversation(convoString);
            }
        };

        vapi.on("Message", handelMessage)

        vapi.on('speech-start', () => {
            console.log('Assistant speech call started')
            setActiveUser(false)
        });
        vapi.on('speech-end', () => {
            console.log('Assistant speech call ended')
            setActiveUser(true)
        });

        vapi.on('call-start', () => {
            console.log('Call started')
            toast("Call Connected...")
        });
        vapi.on('call-end', () => {
            console.log('Call ended')
            toast("Interview Ended!")
            GenerateFeedback();
        });

        //Clean up the listner
        return () => {
            vapi.off("message ", handelMessage);
            vapi.off("call-start ", () => console.log("END"));
            vapi.off("speech-start ", () => console.log("END"));
            vapi.off("speech-end ", () => console.log("END"));
            vapi.off("call-end ", () => console.log("END"));
        };

    }, []);

    const stopInterview = () => {
        vapi.stop();
    }

    const GenerateFeedback = async () => {
        const result = await axios.post('/api/ai-feedback', {
            conversation: conversation
        })
        console.log(result?.data);
        const Content = result.data.content;
        const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
        console.log(FINAL_CONTENT);
        //Save to Database

        const { data, error } = await supabase
            .from('interview-feedback')
            .insert([
                {
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    interview_id: interview_id,
                    feedback: JSON.parse(FINAL_CONTENT),
                    recommeded: false
                },
            ])
            .select();
        if (error) {
            console.error("Error saving feedback to database:", error);
            toast.error("Failed to save feedback. Please try again.");
            return;
        }
        console.log(data);
        router.replace('/interview/' + interview_id + "/completed")
        setLoading(false);
    }

    const startCall = () => {
        let questionList;
        interviewInfo?.interviewData?.questionList.forEach((item, index) => {
            questionList = item?.question + ', ' + questionList;
        })
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPostion + "",

            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },

            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },

            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant designed to conduct technical interviews.

Your primary objective:
Ask candidates the provided interview questions, listen to their responses, and guide the conversation naturally.

Start with a friendly introduction. Keep the tone relaxed yet professional.
Example:
"Hey there! Welcome to your ` + interviewInfo?.interviewData?.jobPostion + ` interview. Let’s get started with a few questions."

Ask one question at a time. Wait for the candidate’s response before moving on.
Use: `+ questionList + `

If the candidate struggles:
Offer hints or gently rephrase the question without revealing the answer.
Example:
"Need a hint? Think about how React tracks component updates."

After each answer, give brief and encouraging feedback:
Examples:
"Nice! That’s a solid answer."
"Hmm, not quite. Want to give it another shot?"

Keep the flow natural and conversational. Use transitions like:
"Alright, next up..."
"Let’s tackle a tricky one."

After 5 to 7 questions, wrap up the interview with a supportive summary.
Example:
"That was great. You handled some tough questions well. Keep sharpening your skills."

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon."

Key Guidelines:
- Be friendly, engaging, and professional
- Keep responses short and natural, like a real conversation
- Adapt to the candidate’s confidence level and tone
- Ensure the interview remains focused on React
        `.trim(),
                    },
                ],
            },
        };
        vapi.start(assistantOptions)
    }



    // vapi.on('message', (message) => {
    //     console.log(message?.conversation);
    //     setConversation(message?.conversation);

    // });


    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl flex justify-between'>Interview Session
                <span className='flex gap-2 items-center'>
                    <Timer />
                    00:00:00
                </span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-white border rounded-lg h-[400px] flex flex-col gap-3 items-center justify-center '>
                    <div className='relative'>
                        {!activeUser && <span className='absolute bg-blue-500 inset-0 rounded-full opacity-75 animate-ping' />}
                        <Image src={'/ai-girl.jpg'} alt='AI Model' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
                        <h2>AI Recruiter</h2>
                    </div>

                </div>
                <div className='bg-white border rounded-lg h-[400px] flex flex-col gap-3 items-center justify-center '>
                    <div className='absolute'>
                        <span className='relative bg-blue-500 inset-0 rounded-full opacity-75 animate-ping' />
                        <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
                        <h2>{interviewInfo?.userName}</h2>
                    </div>

                </div>

            </div>
            <div className='flex items-center justify-center gap-7 mt-4'>
                <Mic className='h-12 w-12 p-3 text-white bg-gray-500 rounded-full cursor-pointer' />

                {/* <AlertComponent stopInterview={() => stopInterview()}> */}

                {
                    !loading ? (
                        <Phone
                            className='h-12 w-12 p-4 text-white bg-red-500 rounded-full cursor-pointer'
                            onClick={() => stopInterview()}
                        />
                    ) : (
                        <Loader2Icon className='animate-spin h-12 w-12 text-gray-500' />
                    )
                }

                {/* </AlertComponent> */}
            </div>

            <h2 className='text-sm text-gray-500 text-center mt-3'>Interview in Progress...</h2>
        </div>
    )
}

export default StartInterview
