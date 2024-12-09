import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdminTravail from './AdminTravail'
function AdminTravailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdminTravail />
        </div>
    )
}

export default AdminTravailComponent
