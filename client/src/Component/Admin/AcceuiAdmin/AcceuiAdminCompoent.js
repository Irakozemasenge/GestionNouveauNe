import React from 'react'
import AcceuiAdmin from './AcceuiAdmin'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
function AcceuiAdminCompoent({HundlwScrollTop}) {
    return (
        <div className='h-full w-full flex overflow-hidden'>
            <SlideAdmin />
            <AcceuiAdmin HundlwScrollTop={HundlwScrollTop} />
        </div>
    )
}

export default AcceuiAdminCompoent
