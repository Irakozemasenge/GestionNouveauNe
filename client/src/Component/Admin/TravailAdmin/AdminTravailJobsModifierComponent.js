import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdminTravailJobsModifier from './AdminTravailJobsModifier'
function AdminTravailJobsModifierComponent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdminTravailJobsModifier />
        </div>
    )
}

export default AdminTravailJobsModifierComponent