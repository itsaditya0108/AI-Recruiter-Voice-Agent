import { Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateTableComponents() {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <Link href={'dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5 cursor-pointer'>

                <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-gray-500'>Create new AI interview and schedule with Candidates</p>

            </Link>
            <div className='bg-white border border-gray-200 rounded-lg p-5'>
                <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
                <h2 className='font-bold '>Phone screening call</h2>
                <p className='text-gray-500'>Phone screening call with Candidates</p>

            </div>

        </div>
    )
}

export default CreateTableComponents
