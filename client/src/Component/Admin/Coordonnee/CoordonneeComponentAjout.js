import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import CoordonneeAjout from './CoordonneeAjout'

function CoordonneeComponentAjout() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <CoordonneeAjout />
        </div>
    )
}

export default CoordonneeComponentAjout
