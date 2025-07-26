"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Plus, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';

function LatestInterviewList() {

    const [interviewList, setinterviewList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        console.log("Fetching interviews for user email:", user?.email);
        let { data: Interview, error } = await supabase
            .from('Interview')
            .select('*')
            .ilike("userEmail", `%${user?.email}%`);

        if (error) {
            console.error("Error fetching interviews:", error);
        } else {
            console.log("Fetched interviews:", Interview);
        }
        setinterviewList(Interview);
    }

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'>Previously Conducted Interviews</h2>
            {interviewList?.length == 0 &&
                <div className='p-5 flex flex-col gap-3 items-center mt-2'>
                    <Video className='h-10 w-10 text-primary' />
                    <h2>You don't have any interview created yet!</h2>
                    <Button><Plus /> Create new Interview</Button>
                </div>}
            {interviewList &&
                <div>
                    {interviewList.map((interview, index) => (
                        <InterviewCard />
                    ))}
                </div>
            }
        </div>

    )
}

export default LatestInterviewList
