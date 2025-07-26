"use client"
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {

    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [interviewId, setInterviewId] = useState();

    const onHandleInputChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));

    }

    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(prev => prev + 1);
    }
    useEffect(() => {
        console.log('Updated FormData: ', formData);
    }, [formData]);

    const onGoToNext = () => {
        if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
            toast("Please enter all details!")
            return;
        }
        setStep(prev => prev + 1);
    }
    return (
        <div className='mt-1 px-10 md:px-24 lg:px-44 xl:px-56'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>

            </div>
            <Progress value={step * 33.33} className='my-5' />
            {step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange}
                GoToNext={() => onGoToNext()} />
                : step == 2 ? <QuestionList formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} />
                    : step == 3 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null}
        </div>
    )
}

export default CreateInterview
