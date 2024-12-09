import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EventAdmin from './EventAdmin'
function EventAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EventAdmin />
        </div>
    )
}

export default EventAdminComponent