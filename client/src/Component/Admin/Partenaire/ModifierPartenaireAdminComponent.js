import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ModifierPartenaireAdmin from './ModifierPartenaireAdmin'

function ModifierPartenaireAdminComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <ModifierPartenaireAdmin />
        </div>
    )
}

export default ModifierPartenaireAdminComponent