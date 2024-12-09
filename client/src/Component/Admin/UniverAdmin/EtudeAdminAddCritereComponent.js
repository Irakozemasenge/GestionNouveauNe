import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EtudeAdCritere from './EtudeAdCritere'

function EtudeAdminAddCritereComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EtudeAdCritere />
        </div>
    )
}

export default EtudeAdminAddCritereComponent