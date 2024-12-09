import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjoutService from './AjoutService'

function AjoutServiceComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjoutService />
        </div>
    )
}

export default AjoutServiceComponent
