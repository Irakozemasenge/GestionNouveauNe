import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdmiVisaArchiveDetail from './AdmiVisaArchiveDetail'

function AdmiVisaArchiveDetailComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdmiVisaArchiveDetail />
        </div>
    )
}

export default AdmiVisaArchiveDetailComponent