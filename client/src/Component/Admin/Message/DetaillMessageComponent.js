import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import DetaillMessage from './DetaillMessage'

function DetaillMessageComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <DetaillMessage />
        </div>
    )
}

export default DetaillMessageComponent
