import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import VisaAdminDeatil from './VisaAdminDeatil'

function VisaAdminDetailComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <VisaAdminDeatil />
        </div>
    )
}

export default VisaAdminDetailComponent