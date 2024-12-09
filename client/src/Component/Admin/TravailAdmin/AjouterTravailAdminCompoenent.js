import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterTravailAdmin from './AjouterTravailAdmin'

function AjouterTravailAdminCompoenent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouterTravailAdmin />
        </div>
    )
}

export default AjouterTravailAdminCompoenent
