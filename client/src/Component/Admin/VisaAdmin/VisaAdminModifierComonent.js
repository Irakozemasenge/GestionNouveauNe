import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import VisaAdminModifier from './VisaAdminModifier'

function VisaAdminModifierComonent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <VisaAdminModifier />
        </div>
    )
}

export default VisaAdminModifierComonent