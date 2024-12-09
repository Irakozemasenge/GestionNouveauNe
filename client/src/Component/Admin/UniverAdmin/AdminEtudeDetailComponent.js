import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import BourceAdminEtudeDetail from './AdminEtudeDetail'
function AdminEtudeDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <BourceAdminEtudeDetail />
        </div>
    )
}

export default AdminEtudeDetailComponent
