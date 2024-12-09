import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ModifierContrant from './ModifierContrant'

function ModifierContrantComponent() {
    return (
        <div className='flex h-full w-full overflow-hidden'>
            <SlideAdmin />
            <ModifierContrant />
        </div>
    )
}

export default ModifierContrantComponent