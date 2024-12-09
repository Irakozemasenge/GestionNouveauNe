import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Publicite from './Publicite'

function PubliciteCompoent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Publicite />
        </div>
    )
}

export default PubliciteCompoent