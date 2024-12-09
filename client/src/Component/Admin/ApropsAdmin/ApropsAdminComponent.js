import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ApropsAdmin from './ApropsAdmin'

function ApropsAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <ApropsAdmin />
        </div>
    )
}

export default ApropsAdminComponent