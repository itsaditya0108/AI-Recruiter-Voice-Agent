import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, MessageCircle, MessageCircleMore, Plus } from 'lucide-react'
import { Slackey } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink({ interview_id, formData }) {
    const url = process.env.NEXT_PUBLIC_URL_HOST + '/' + interview_id

    const getInterviewURL = () => {
        return url
    }

    const onCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast('Link Copied!');

    }
    return (

        <div className='flex flex-col items-center justify-center mt-10'>
            <Image src={'/check.png'} alt='check' width={100} height={100} className='w-[50px] h-[50px]'></Image>
            <h2 className='font-bold text-lg mt-4'>Your Interview Link is Ready!</h2>
            <p className='mt-3'>Share this link with your friends also to start the interview.</p>
            <div className='w-full p-7 mt-6 bg-white rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold'>Interview Link</h2>
                    <h2 className='p-1 text-sm px-2 bg-blue-50 text-primary rounded'>Valid for 30 days!</h2>
                </div>
                <div className='mt-3 flex gap-3 items-center'>
                    <Input defaultValue={getInterviewURL()} disabled={true} />
                    <Button onClick={() => onCopyLink()}><Copy />Copy Link</Button>
                </div>
                <hr className='my-5' />
                <div className='flex gap-5'>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='w-4 h-4' />35 minutes{formData?.duration}</h2>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='w-4 h-4' />10 Questions</h2>
                </div>
            </div>
            <div className='mt-7 p-5 bg-white rouded-lg w-full'>
                <h2 className='font-bold'>Share via</h2>
                <div className='mt-3 flex justify-around'>
                    <Button variant={'outline'} className='ml-5'><Mail />Email</Button>
                    <Button variant={'outline'} className='ml-0 mr-0'><MessageCircle />Slack</Button>
                    <Button variant={'outline'} className='mr-5'><MessageCircleMore />WhatsApp</Button>
                </div>
            </div>
            <div className='flex mt-6 w-full justify-between'>
                <Link href={'/dashboard'}>
                    <Button variant={'outline'}><ArrowLeft /> Back to Dashboard</Button>
                </Link>
                <Link href={'/create-interview'}>
                    <Button><Plus />Create new Interview</Button>
                </Link>
            </div>
        </div>
    )
} []

export default InterviewLink
