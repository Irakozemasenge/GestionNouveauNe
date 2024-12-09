import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import PartenaireAdmin from './PartenaireAdmin'

function PartenaireAdmiComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <PartenaireAdmin />
        </div>
    )
}

export default PartenaireAdmiComponent