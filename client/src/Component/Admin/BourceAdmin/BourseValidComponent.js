import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'

import BourseValidDetail from './BourseValidDetail'
function BourseValidComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourseValidDetail />
        </div>
    )
}

export default BourseValidComponent