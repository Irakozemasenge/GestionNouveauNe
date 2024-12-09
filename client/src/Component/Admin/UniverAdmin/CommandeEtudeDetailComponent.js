import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import CommandeEtudeDetail from './CommandeEtudeDetail'

function CommandeEtudeDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <CommandeEtudeDetail />
        </div>
    )
}

export default CommandeEtudeDetailComponent