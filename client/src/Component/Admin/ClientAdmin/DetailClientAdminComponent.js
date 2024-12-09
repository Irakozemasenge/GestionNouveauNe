import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import DetailClientAdmin from './DetailClientAdmin'

function DetailClientAdminComponent() {
    return (
        <div className='flex overflow-hidden w-full h-full'>
            <SlideAdmin />
            <DetailClientAdmin />
        </div>
    )
}

export default DetailClientAdminComponent