import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import HoraireModifier from './HoraireModifier'

function HoraireComponentModifier() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <HoraireModifier />
        </div>
    )
}

export default HoraireComponentModifier
