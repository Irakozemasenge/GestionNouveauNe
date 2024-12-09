import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import EditorAdminPublicite from './EditorAdminPublicite'
function EditorAdminPubliciteCompoenent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <EditorAdminPublicite />
        </div>
    )
}

export default EditorAdminPubliciteCompoenent