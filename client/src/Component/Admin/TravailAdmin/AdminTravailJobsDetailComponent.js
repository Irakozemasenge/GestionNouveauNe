import React from 'react'
import AdminTravailJobsDetail from './AdminTravailJobsDetail'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
function AdminTravailJobsDetailComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdminTravailJobsDetail />
        </div>
    )
}

export default AdminTravailJobsDetailComponent