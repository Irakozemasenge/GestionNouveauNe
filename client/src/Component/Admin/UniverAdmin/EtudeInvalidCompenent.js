import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'

import EtudeInvalid from './EtudeInvalid'

function EtudeInvalidCompenent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EtudeInvalid />
        </div>
    )
}

export default EtudeInvalidCompenent