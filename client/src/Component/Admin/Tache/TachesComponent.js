/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Taches from './Taches'

function TachesComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Taches />
        </div>
    )
}

export default TachesComponent