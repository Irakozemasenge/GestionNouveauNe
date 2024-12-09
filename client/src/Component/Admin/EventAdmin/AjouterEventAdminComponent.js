import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterEventAdmin from './AjouterEventAdmin'

function AjouterEventAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouterEventAdmin />
        </div>
    )
}

export default AjouterEventAdminComponent