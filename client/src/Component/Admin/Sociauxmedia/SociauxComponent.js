import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Sociaux from './Sociaux'

function SociauxComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Sociaux />
        </div>
    )
}

export default SociauxComponent
