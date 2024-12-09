import React from 'react'
import BourceAdmin from './BourceAdmin'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
function BourceAdminComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourceAdmin />
        </div>
    )
}

export default BourceAdminComponent
