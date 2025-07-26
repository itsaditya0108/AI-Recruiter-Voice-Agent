import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
    return (
        <div className='shadow-sm'>
            <Image
                src="/logo2.png"
                alt="Full Background Logo"
                width={200} height={70}
                className='w-[280px]'
            />
        </div>
    )
}

export default InterviewHeader
