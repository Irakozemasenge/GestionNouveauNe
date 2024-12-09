import React from 'react'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
import Message from './Message'

function MessageComponent() {
    return (
        <div className='flex w-full h-full overflow-hidden'>
            <SlideAdmin />
            <Message />
        </div>
    )
}

export default MessageComponent