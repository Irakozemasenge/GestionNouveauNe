/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom';

function FootentContent() {
    const [mobile, Setmobile] = useState(window.innerWidth < 617);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 617)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])
    return (
        <div className='w-full flex flex-col justify-center items-center  bg-white'>
            <svg className=" relative  " preserveAspectRatio="none" viewBox="0 0 100 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,10  C20,35 40,5 60,15 C80,25 90.5,0 100,15 L100,30 L0,30 Z" fill="#ca3232"></path>
            </svg>
            <div className={`bg-[#ca3232] w-full text-white h-max p-2 flex ${mobile ? 'flex-col' : 'justify-around items-center'}  z-10 font-medium `}>
                <div className="flex flex-col  p-2 items-start leading-[1.6em] max-w rounded ">
                    <div className='font-bold font-sans underline cursor-default'>Branche</div>
                    <Link to='/bourse' className='flex text-white w-full p-1 transition-all hover:underline'>Recherche de bourse</Link>
                    <Link to='/universite' className='flex text-white w-full p-1 transition-all hover:underline'>Recherche d'Etudes</Link>
                    <Link to='/travail' className='flex text-white w-full p-1 transition-all hover:underline'>Recherche de travail</Link>
                    <Link to='/evenement' className='flex text-white w-full p-1 transition-all rounded hover:underline'>Evenement</Link>
                </div>

                <div className="flex flex-col  p-2 items-start leading-[1.6em] max-w rounded ">
                    <div className='font-bold font-sans underline cursor-default'>Contactez-nous</div>
                    <button className='flex w-full p-1 footers'><b className='mr-2'>Email: </b>
                        <a href="mailto:anicet-niyonkuru@abahs-jobconnect.com" className='text-blue-950' target='_blank'>anicet-niyonkuru@abahs-jobconnect.com</a>
                    </button>
                    <button className='flex w-full p-1 footers'><b className='mr-2'>FaceBook:</b>
                        <a href="https://www.facebook.com/profile.php?id=100091378817785" className='text-blue-950' target='_blank'>ABAHSJOBCONNECt</a>
                    </button>
                    <button className=' w-full p-1 footers hidden'><b className='mr-2'>Instagram:</b><a className='text-blue-950' href="#" target='_blank transition-all'>Burundi en temp reel</a></button>
                    <button className='flex w-full p-1 footers'><b className='mr-2'>Youtube:</b><a className='text-blue-950' href="https://www.youtube.com/@Burundientempsreel" target='_blank'>Burundi en temps réel</a></button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FootentContent
