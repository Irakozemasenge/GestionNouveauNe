import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Horaire from './Horaire'

function HoraireComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Horaire />
        </div>
    )
}

export default HoraireComponent
