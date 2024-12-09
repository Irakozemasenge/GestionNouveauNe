import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import CoordonneeModifier from './CoordonneeModifier'

function CoordonneeComponentModifier() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <CoordonneeModifier />
        </div>
    )
}

export default CoordonneeComponentModifier
