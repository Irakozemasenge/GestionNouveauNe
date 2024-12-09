import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouteClientAdmin from './AjouteClientAdmin'

function AjouteClientAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouteClientAdmin />
        </div>
    )
}

export default AjouteClientAdminComponent