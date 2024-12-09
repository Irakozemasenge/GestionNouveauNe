import React from 'react'
import NouvelContrant from './NouvelContrant'
import SlideAdmin from '../SlideAdmin/SlideAdmin'

function NouvelContrantComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <NouvelContrant />
        </div>
    )
}

export default NouvelContrantComponent