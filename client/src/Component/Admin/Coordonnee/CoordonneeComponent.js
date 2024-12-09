import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Coordonnee from './Coordonnee'

function CoordonneeComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Coordonnee />
        </div>
    )
}

export default CoordonneeComponent
