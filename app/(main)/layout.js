import React from 'react'
import Provider from '@/app/provider'
import DashboardProvider from './provider'

function DashboardLayout({ children }) {
    return (

        <div>
            <Provider>
                <DashboardProvider>
                    <div className='p-10'>
                        {children}
                    </div>
                </DashboardProvider>
            </Provider>
        </div>

    )
}

export default DashboardLayout
