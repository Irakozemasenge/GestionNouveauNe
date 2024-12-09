import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterTaches from './AjouterTaches'

function AjouterTachesComponenent() {
    return (
        <div className='flex h-full w-full overflow-hidden'>
            <SlideAdmin />
            <AjouterTaches />
        </div>
    )
}

export default AjouterTachesComponenent