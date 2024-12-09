import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import VisaAdminAjout from './VisaAdminAjout'

function VisaAdminAjoutComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <VisaAdminAjout />
        </div>
    )
}

export default VisaAdminAjoutComponent