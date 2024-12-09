import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import DetailPartenaireAdmin from './DetailPartenaireAdmin'

function DetailPartenaireAdminComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <DetailPartenaireAdmin />
        </div>
    )
}

export default DetailPartenaireAdminComponent