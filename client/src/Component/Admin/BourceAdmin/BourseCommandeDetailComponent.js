import React from 'react'
import BourseCommandeDetail from './BourseCommandeDetail'
import SlideAdmin from '../SlideAdmin/SlideAdmin'

function BourseCommandeDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourseCommandeDetail />
        </div>
    )
}

export default BourseCommandeDetailComponent