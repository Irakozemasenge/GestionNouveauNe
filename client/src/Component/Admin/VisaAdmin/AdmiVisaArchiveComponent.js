import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdmiVisaArchive from './AdmiVisaArchive'

function AdmiVisaArchiveComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdmiVisaArchive />
        </div>
    )
}

export default AdmiVisaArchiveComponent