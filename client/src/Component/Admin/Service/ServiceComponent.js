import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Service from './Service'
function ServiceComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Service />
        </div>
    )
}

export default ServiceComponent
