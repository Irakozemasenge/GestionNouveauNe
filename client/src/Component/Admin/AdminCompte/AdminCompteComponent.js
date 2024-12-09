import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdminCompte from './AdminCompte'

function AdminCompteComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdminCompte />
        </div>
    )
}

export default AdminCompteComponent