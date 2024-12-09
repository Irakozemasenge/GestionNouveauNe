import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import DetailTitreEvenet from './DetailTitreEvenet'

function DetailTitreEvenetComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <DetailTitreEvenet />
        </div>
    )
}

export default DetailTitreEvenetComponent