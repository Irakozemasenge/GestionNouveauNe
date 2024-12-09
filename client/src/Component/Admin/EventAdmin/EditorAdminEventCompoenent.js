import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EditorAdminEvent from './EditorAdminEvent'

function EditorAdminEventCompoenent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EditorAdminEvent />
        </div>
    )
}

export default EditorAdminEventCompoenent