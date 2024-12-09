import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import BourseInvalid from './BourseInvalid'

function BourseInvalidCompenent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourseInvalid />
        </div>
    )
}

export default BourseInvalidCompenent