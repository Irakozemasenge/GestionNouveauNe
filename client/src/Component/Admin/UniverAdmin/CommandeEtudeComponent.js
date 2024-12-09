import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import CommandeEtude from './CommandeEtude'

function CommandeEtudeComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <CommandeEtude />
        </div>
    )
}

export default CommandeEtudeComponent
