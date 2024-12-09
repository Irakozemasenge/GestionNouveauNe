import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ApropsAdminModifier from './ApropsAdminModifier'

function ApropsAdminModifierComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <ApropsAdminModifier />
        </div>
    )
}

export default ApropsAdminModifierComponent