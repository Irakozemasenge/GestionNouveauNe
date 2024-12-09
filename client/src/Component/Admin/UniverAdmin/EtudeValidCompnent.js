import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EtudeValid from './EtudeValid'

function EtudeValidCompnent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EtudeValid />
        </div>
    )
}

export default EtudeValidCompnent
