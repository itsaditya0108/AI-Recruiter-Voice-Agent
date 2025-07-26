import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateTableComponents from './_components/CreateTableComponents'
import LatestInterviewList from './_components/LatestInterviewList'

function page() {
    return (
        <div>
            {/* <WelcomeContainer /> */}
            <h2 className='font-bold text-2xl mb-2'>Dashboard</h2>
            <CreateTableComponents />
            <LatestInterviewList />
        </div>
    )
}

export default page
