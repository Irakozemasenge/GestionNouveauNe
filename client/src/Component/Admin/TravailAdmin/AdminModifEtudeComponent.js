import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdminModifEtude from './AdminModifEtude'
function AdminModifEtudeComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdminModifEtude />
        </div>
    )
}

export default AdminModifEtudeComponent