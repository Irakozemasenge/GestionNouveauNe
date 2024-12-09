/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@rsuite/icons';

import { FadeLoader } from 'react-spinners';
import { Popover, Whisper } from 'rsuite';
import { useThemes } from '../../UserContext/UserContext';

function NavBars() {

    const { pathname } = useLocation()
    const { mobile, menu, GetMenue } = useThemes()


    const [mobile1, Setmobile1] = useState(window.innerWidth < 70);




    const [loadings, Setloadings] = useState(true);

    const [mobile2, SetMobile2] = useState(window.innerWidth < 317)



    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    useEffect(() => {
        const hundleSize = () => {

            SetMobile11(window.innerWidth < 501)
        }
        window.addEventListener('resize', hundleSize)
        return () => window.removeEventListener('resize', hundleSize)
    }, [])


    const deconnection = React.forwardRef((propos, ref) => (
        <svg {...propos} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi  bi-circle-half h-5 w-5" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
        </svg>

    ))

    const [isLoading, GetisLoading] = useState(true)
    const [isLoading1, GetisLoading1] = useState(true)
    const [isLoading2, GetisLoading2] = useState(true)

    const hundleLoading = () => {
        GetisLoading(false)
    }
    const hundleLoading1 = () => {
        GetisLoading1(false)

    }

    const hundleLoading2 = () => {
        GetisLoading2(false)

    }



    return (
        <div className={`flex justify-between relative items-center px-2  overflow-hidden border-b border-[#83ff4a] w-full h-[10vh]`}>
            {mobile &&
                <div className='h-full flex items-center'>
                    <div onClick={(e) => { GetMenue(!menu); e.stopPropagation() }} className='bg-green-100 rounded cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#5dca32" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                    <Link to="/" className='h-full ml-4 p-2 w-max'>
                        <img className='w-full h-full' src="image/logos.jpg" alt='    ' />
                    </Link>
                </div>
            }
            <Link to='/' className='w-max  h-[13vh] '>
                <img src='http://localhost:7000/imageUpload/pharmacie.png' draggable={false} className='w-full h-full object-contain' alt='     ' />
            </Link>
            <div className='h-full w-max flex items-end'>
                <div className={`flex`}>
                    <div className={`flex flex-col `}>
                        <div className={`flex w-max  mb-2 items-center`}>
                            <Link className='text-black hover:text-black  focus:text-black  focus:no-underline hover:no-underline'>
                                NIYOMWUNGERE Onesphore
                            </Link>
                            <div className='w-max h-max relative'>
                                <Whisper
                                    placement='auto'
                                    trigger='click'

                                    speaker={
                                        <Popover>
                                            <div>
                                                <div>
                                                    <div class='w-24 h-24 relative border overflow-hidden'>

                                                        {isLoading2 && <div className={`absolute  w-full z-[60]  h-full  pl-4 pt-2  top-0 left-0   flex items-center justify-center`}>
                                                            <FadeLoader
                                                                color="#36d7b7"
                                                                height={15}
                                                                width={2}
                                                                margin={-5}
                                                            />
                                                        </div>
                                                        }
                                                        <img draggable='false' onLoad={hundleLoading2}
                                                            src={`image/btr.png`} alt="    " className='w-full h-full  object-cover' />
                                                    </div>
                                                    <Link to='/count' className=' mt-2 font-serif hover:no-underline focus:no-underline hover:text-black  focus:text-black text-black text-[20px]'>Gérer le compte</Link>
                                                </div>
                                                <div className={`flex p-2 mb-1 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center `}>
                                                    <div className="flex  w-[15em] items-center" >
                                                        <div className="mr-2"><Icon as={deconnection} /></div>
                                                        <div className="text-[17px]">Deconnecte</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Popover>
                                    }
                                >
                                    <div className="flex justify-end items-center h-full  mr-1 px-3">
                                        <div className={`border  rounded-lg cursor-pointer relative overflow-hidden ${mobile1 ? 'w-[40px] h-[40px] ' : 'w-[50px] h-[50px] '}`}>

                                            {isLoading1 && <div className={`absolute  w-full z-[60]  h-full  pl-4 pt-2  top-0 left-0   flex items-center justify-center`}>
                                                <FadeLoader
                                                    color="#36d7b7"
                                                    height={mobile1 ? '' : 15}
                                                    width={2}
                                                    margin={-5}
                                                />
                                            </div>
                                            }
                                            <img draggable='false' onLoad={hundleLoading1}
                                                src={`image/btr.png`} alt='    ' className='w-full h-full object-cover' />
                                        </div>
                                    </div>
                                </Whisper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBars




