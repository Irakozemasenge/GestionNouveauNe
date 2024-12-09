import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EventAdminAddMore from './EventAdminAddMore'

function EventAdminAddMoreComponent() {
    return (

        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EventAdminAddMore />
        </div>

    )
}

export default EventAdminAddMoreComponent