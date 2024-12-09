import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import TachesExpire from './TachesExpire'

function TachesExpireComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <TachesExpire />
        </div>
    )
}

export default TachesExpireComponent