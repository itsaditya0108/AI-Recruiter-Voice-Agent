import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData, onCreateLink }) {

    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();
    const { user } = useUser();
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])

    const onFinish = async () => {
        setLoading(true);
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interview')
            .insert({
                ...formData,
                questionList: questionList,
                userEmail: user?.email,
                interview_id: interview_id,

            })
            .select()
        setLoading(false);
        console.log(data);
        onCreateLink(interview_id);
    }

    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-model', {
                ...formData,

            })
            console.log(result.data);

            // Adjusted parsing to match API response structure
            const contentString = result.data.content;

            // Remove markdown code block wrappers if present
            const cleanedContent = contentString.replace(/```json/g, '').replace(/```/g, '').trim();

            const parsedContent = JSON.parse(cleanedContent);

            setQuestionList(parsedContent.interviewQuestions);
            setLoading(false);
        }
        catch (e) {
            if (e.response && e.response.status === 429) {
                toast("Rate limit exceeded. Please wait and try again later.");
            } else {
                toast("Server Error, Try again!");
            }
            setLoading(false);
        }

    }
    return (
        <div>
            {loading && <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center
            '>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-medium'>Generation Interview Questions...</h2>
                    <p className='text-primary'>Our AI is crafting personalized question based on job position.</p>
                </div>
            </div>
            }
            {questionList?.length > 0 &&
                <div>
                    <QuestionListContainer questionList={questionList} />
                </div>
            }
            <div className='flex justify-end mt-10'>
                <Button onClick={() => onFinish()} disabled={saveLoading}>
                    {setLoading && <Loader2 className='animate-spin' />}
                    Click Generate Link & Finish</Button>
            </div>
        </div>
    )
}

export default QuestionList

