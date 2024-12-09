import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import VisaAdmin from './VisaAdmin'

function VisaAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <VisaAdmin />
        </div>
    )
}

export default VisaAdminComponent