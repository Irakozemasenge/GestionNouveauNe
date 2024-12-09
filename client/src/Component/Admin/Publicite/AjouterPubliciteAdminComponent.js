import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterPubliciteAdmin from './AjouterPubliciteAdmin'
function AjouterPubliciteAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouterPubliciteAdmin />
        </div>
    )
}

export default AjouterPubliciteAdminComponent