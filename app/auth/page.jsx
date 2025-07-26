"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { LogInIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

// Used to sign In with Google
const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })

    if (error) {
        console.error('Error:', error.message)
    }
}


function Page() {
    return (


        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-center border rounded-2xl p-8'>
                <Image src={'/microphone.png'} alt='logo' width={50} height={50} className='w-[50px]'></Image>
                <div className='flex flex-col items-center gap-1.5'>
                    <Image src={'/login1.png'} alt="login" width={500} height={300} className='w-[400px] h-[250px] rounded-2xl' ></Image>
                    <h2 className='text-2xl font-bold text-center mt-3'>Welcome to Mock Interview</h2>
                    <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
                    <Button className='mt-3 w-full' onClick={signInWithGoogle} ><LogInIcon /> Login with Google</Button>
                </div>

            </div>
        </div >
    )
}

export default Page
