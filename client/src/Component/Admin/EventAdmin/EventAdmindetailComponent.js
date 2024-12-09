import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EventAdminDeatil from './EventAdminDeatil'

function EventAdmindetailComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EventAdminDeatil />
        </div>
    )
}

export default EventAdmindetailComponent