import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import CommandeTravail from './CommandeTravail'

function CommandeTravailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <CommandeTravail />
        </div>
    )
}

export default CommandeTravailComponent
