import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import DetailPublicite from './DetailPublicite'

function DetailPubliciteEvenetComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <DetailPublicite />
        </div>
    )
}

export default DetailPubliciteEvenetComponent