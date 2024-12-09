import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import VisaAdminCommande from './VisaAdminCommande'

function VisaAdminCommandeComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <VisaAdminCommande />
        </div>
    )
}

export default VisaAdminCommandeComponent