import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import AjouterBourseAdmin from './AjouterBourseAdmin'

function AjouterBourseAdminCompoenent() {
    return (
        <div className='flex  w-full h-full overflow-hidden'>
            <SlideAdmin />
            <AjouterBourseAdmin />
        </div>
    )
}

export default AjouterBourseAdminCompoenent
