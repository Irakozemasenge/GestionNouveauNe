import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ModifierClientAdmin from './ModifierClientAdmin'

function ModifierClientAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <ModifierClientAdmin />
        </div>
    )
}

export default ModifierClientAdminComponent