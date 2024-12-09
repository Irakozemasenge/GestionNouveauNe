/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@rsuite/icons';
import { useThemes } from '../../UserContext/UserContext';
import { FadeLoader } from 'react-spinners';
import { Popover, Whisper } from 'rsuite';

function NavBars2() {
    const { nombreMedic, enfantId } = useThemes()

    const [menu, SetMenue] = useState(false);
    const [mobile, Setmobile] = useState(window.innerWidth < 70);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 70);

    useEffect(() => {

        const hundleSize = () => {
            Setmobile(window.innerWidth < 1170)
            Setmobile1(window.innerWidth < 710)
            SetMenue(false)
        }
        const hundleclick = (e) => {
            SetMenue(false)
        }
        window.addEventListener('resize', hundleSize)
        window.addEventListener('click', hundleclick)


        return () => {
            window.removeEventListener('resize', hundleSize)
            window.removeEventListener('click', hundleclick)
        }
    }, [])



    const [loadings, Setloadings] = useState(true);

    const [mobile2, SetMobile2] = useState(window.innerWidth < 317)

    useEffect(() => {

        const hundleSize = () => {
            SetMobile2(window.innerWidth < 317)
            SetMenue(false)
        }
        const hundleclick = (e) => {
            SetMenue(false)
        }
        window.addEventListener('resize', hundleSize)
        window.addEventListener('click', hundleclick)


        return () => {
            window.removeEventListener('resize', hundleSize)
            window.removeEventListener('click', hundleclick)
        }
    }, [])




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

    const Sun = React.forwardRef((props, ref) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi w-5 h-5 bi-sun" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
        </svg>
    ));
    const Moon = React.forwardRef((props, ref) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill h-7 y-7 cursor-pointer" viewBox="0 0 16 16">
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
        </svg>
    ));
    const SemiMoon = React.forwardRef((props, ref) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half h-5 w-5" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
        </svg>
    ));

    const navigate = useNavigate()


    const [mobille, GetMobille] = useState(window.innerWidth < 690)
    const [mobille1, GetMobille1] = useState(window.innerWidth < 413)
    useEffect(() => {
        const HundleSize = () => {
            GetMobille(window.innerWidth < 690)
            GetMobille1(window.innerWidth < 413)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])

    const { pathname } = useLocation()
    let Vaccination = /^\/Vaccination.*/

    return (
        <div className={`flex justify-between relative items-center px-2  overflow-hidden border-b border-[#83ff4a] w-full h-[10vh]`}>
            <Link to='/' className='w-max  h-[13vh] '>
                <img src='http://localhost:7000/imageUpload/pharmacie.png' draggable={false} className='w-full h-full object-contain' alt='     ' />
            </Link>
            <div className='h-full w-max flex items-end'>
                <div className={`flex`}>
                    <div className={`flex flex-col `}>
                        <div className={`flex w-max  mb-2 items-center`}>
                            <Link to={Vaccination.test(pathname) ? `/Vaccination/medCart/${enfantId}` : `/consult/medCart/${enfantId}`} className='mr-5 relative cursor-pointer border border-[#5dca32] p-2 rounded'>
                                <div className='absolute -top-2.5 -right-2.5 pointer-events-none bg-[#5dca32] w-5 h-5 flex justify-center items-center text-white'>{nombreMedic}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                </svg>
                            </Link>

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
        </div >
    )
}

export default NavBars2




