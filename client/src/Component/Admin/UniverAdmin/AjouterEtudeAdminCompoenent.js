import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterEtudeAdmin from './AjouterEtudeAdmin'

function AjouterEtudeAdminCompoenent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouterEtudeAdmin />
        </div>
    )
}

export default AjouterEtudeAdminCompoenent
