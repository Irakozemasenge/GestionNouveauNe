import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import VisaAdminCommandeDetail from './VisaAdminCommandeDetail'

function VisaAdminCommandeDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <VisaAdminCommandeDetail />
        </div>
    )
}

export default VisaAdminCommandeDetailComponent