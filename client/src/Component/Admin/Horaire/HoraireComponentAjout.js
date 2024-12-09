import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import HoraireAjout from './HoraireAjout'

function HoraireComponentAjout() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <HoraireAjout />
        </div>
    )
}

export default HoraireComponentAjout
