import React, { useEffect, useState } from 'react'
import LogImage from './Image'
import { Link } from 'react-router-dom'
function Footer() {
    const [mobile1, SetMobile1] = useState(window.innerWidth < 400)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 400)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])
    return (
        <div className={`copy p-4 bg-[rgba(10,1,67,0.93)] flex  ${mobile1 ? 'flex-col' : ''} w-full text-center justify-center items-center  text-white`}>
            CopyRight ,developpée par la sociéte
            <Link className={`flex items-center text-white focus:text-white ${mobile1 ? 'flex-col' : ''}  hover:text-blue-300`} to='https://www.burundientempsreel.com' target='_blank'>
                <div className="w-[40px]  p-1 h-[40px] mx-2  border-4  border-double border-blue-600 rounded-full overflow-hidden"><LogImage /></div>
                Burundi en Temps Réel
            </Link>
        </div>
    )
}

export default Footer
