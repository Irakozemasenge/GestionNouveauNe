import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import TachesModifier from './TachesModifier'

function TachesModifierComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <TachesModifier />
        </div>
    )
}

export default TachesModifierComponent