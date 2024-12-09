import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import BourceAdminEtude from './AdminEtude'
function AdminEtudeComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourceAdminEtude />
        </div>
    )
}

export default AdminEtudeComponent
