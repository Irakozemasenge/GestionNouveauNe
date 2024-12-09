import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjoutPartenaireAdmin from './AjoutPartenaireAdmin'

function AjoutPartenaireAdminComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjoutPartenaireAdmin />
        </div>
    )
}

export default AjoutPartenaireAdminComponent