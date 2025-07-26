import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({ onHandleInputChange, GoToNext }) {

    const [interviewType, setInterviewType] = useState([]);
    useEffect(() => {
        onHandleInputChange('type', interviewType);
    }, [interviewType])

    const addInterviewType = (type) => {
        setInterviewType(prev => {
            if (prev.includes(type)) {
                return prev.filter(item => item != type)
            }
            else {
                return [...prev, type]
            }
        })
    }
    return (
        <div className='p-5 bg-white rounded-xl'>
            <div>
                <h2 className='text-sm font-medium'>Job Position</h2>
                <Input placeholder='e.g. Full Stack Developer' className='mt-2'
                    onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Job Description</h2>
                <Textarea placeholder='Enter details job description ...' className='mt-2 h-30'
                    onChange={(event) => onHandleInputChange('jobDescription', event.target.value)} />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Duration</h2>
                <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className='mt-5'>
                <h2 className='text-sm'>Inteview Type</h2>
                <div className='flex gap-3 flex-wrap mt-2'>
                    {InterviewType.map((type, index) => (
                        <div key={index} className={`flex gap-2 items-center cursor-pointer p-1 px-2 
                        hover:bg-secondary bg-white border border-gray-500 rounded-2xl 
                        ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'}`}
                            onClick={() => addInterviewType(type.title)}
                        >
                            <type.icon className='w-4 h-4' />
                            <span>{type.title}</span>
                        </div>
                    ))}
                </div>

            </div>
            <div className='mt-7 flex justify-end' onClick={() => GoToNext()}>
                <Button type='button'>Generate Questions <ArrowRight /></Button>
            </div>

        </div>

    )
}

export default FormContainer
