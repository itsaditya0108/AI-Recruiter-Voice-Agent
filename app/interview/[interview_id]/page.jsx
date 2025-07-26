"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

function Page() {

    const { interview_id } = useParams();
    console.log(interview_id);
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);


    const router = useRouter();

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: Interview, error } = await supabase
                .from('Interview')
                .select("jobPosition, jobDescription, duration, type")
                .eq("interview_id", interview_id)
            setInterviewData(Interview[0]);
            setLoading(false);
            if (Interview?.length == 0) {
                toast("Incorrect Interview Link!")
                return;
            }
        }
        catch (e) {
            setLoading(false);
            toast("Incorrect Interview Link!");
        }

    }

    const onJoinInterview = async () => {
        setLoading(true)
        let { data: Interview, error } = await supabase
            .from('Interview')
            .select("*")
            .eq("interview_id", interview_id);

        console.log(Interview[0]);
        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            interviewData: Interview[0]
        })
        router.push('/interview/' + interview_id + '/start')
        setLoading(false)
    }



    return (
        <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-6">
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:54'>
                <Image
                    src="/logo2.png"
                    alt="Full Background Logo"
                    width={200} height={50}
                    className='w-[280px] -mt-9 -mb-9'
                />

                <Image src="/interviewsupport1.png" alt="interview" width={200} height={100} className='w-[220px] p-6 -mt-9' />
                {/* Title */}
                <h2 className="font-bold text-xl text-center mt-2">{interviewData?.jobPosition}</h2>

                {/* Duration */}
                <h2 className="flex items-center text-gray-500 mt-3 text-sm">
                    <Clock className="w-4 h-4 mr-1" /> Duration: {interviewData?.duration} minutes
                </h2>

                {/* Name Input */}
                <div className="w-full mt-5">
                    <h2 className="mb-1 text-sm font-medium">Enter your Full Name:</h2>
                    <Input placeholder="e.g. Sushant Verma" onChange={(event) => setUserName(event.target.value)} />
                </div>

                <div className="w-full mt-5">
                    <h2 className="mb-1 text-sm font-medium">Enter your Email Id:</h2>
                    <Input type="email" required placeholder="e.g. sushantvar123@gmail.com" onChange={(event) => setUserEmail(event.target.value)} />
                </div>

                {/* Info Box */}
                <div className="p-4 bg-blue-100 rounded-lg mt-6 w-full">
                    <div className="flex items-start gap-3">
                        <Info className="text-primary mt-1" />
                        <div>
                            <h2 className="font-bold mb-2">Before you begin:</h2>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-primary">
                                <li>Test your camera and microphone</li>
                                <li>Ensure you have a stable internet connection</li>
                                <li>Find a quiet place for the interview</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Join Button */}
                <Button className={"mt-6 w-full font-bold"}
                    disabled={loading || !userName || !userEmail}
                    onClick={() => onJoinInterview()}>
                    <Video className="w-4 h-4 mr-2" />
                    {loading && <Loader2Icon />}Join Interview
                </Button>
            </div>
        </div>

    )
}

export default Page
