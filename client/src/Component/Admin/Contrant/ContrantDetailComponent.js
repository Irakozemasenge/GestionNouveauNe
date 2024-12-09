import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import ContrantDetail from './ContrantDetail'

function ContrantDetailComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <ContrantDetail />
        </div>
    )
}

export default ContrantDetailComponent