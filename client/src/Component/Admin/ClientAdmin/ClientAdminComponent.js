import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ClientAdmin from './ClientAdmin'

function ClientAdminComponent() {
    return (
        <div className='h-full w-full flex overflow-hidden'>
            <SlideAdmin />
            <ClientAdmin />
        </div>
    )
}

export default ClientAdminComponent