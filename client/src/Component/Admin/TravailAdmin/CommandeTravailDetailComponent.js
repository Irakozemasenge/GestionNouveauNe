import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import CommandeTravailDetail from './CommandeTravailDetail'

function CommandeTravailDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <CommandeTravailDetail />
        </div>
    )
}

export default CommandeTravailDetailComponent