import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterSociaux from './AjouterSociaux'

function AjouterSociauxComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouterSociaux />
        </div>
    )
}

export default AjouterSociauxComponent
