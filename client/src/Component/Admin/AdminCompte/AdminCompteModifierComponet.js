import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AdminCompteModifier from './AdminCompteModifier'

function AdminCompteModifierComponet() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AdminCompteModifier />
        </div>
    )
}

export default AdminCompteModifierComponet