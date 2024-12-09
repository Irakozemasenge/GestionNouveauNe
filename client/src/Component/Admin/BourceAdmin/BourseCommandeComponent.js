import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import BourseCommande from './BourseCommande'

function BourseCommandeComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourseCommande />
        </div>
    )
}

export default BourseCommandeComponent
