import React from 'react'
import BourceAdminDetail from './BourceAdminDetail'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
function BourceAdminDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourceAdminDetail />
        </div>
    )
}

export default BourceAdminDetailComponent
