"use client"
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {

    const { user } = useUser();

    return (
        <div className='bg-white p-5 m-7 mt-6 -mb-4 rounded-xl flex justify-between items-center'>
            <div>
                <h2 className='text-lg font-bold'>Welcome back, {user?.name}</h2>
                <h2 className='text-gray-500'>AI-Driven, Hassle Free Interview</h2>
            </div>
            {user && <Image src={user?.picture} alt='userAvtar' width={50} height={50} className='rounded-full'></Image>}
        </div>
    )
}

export default WelcomeContainer
