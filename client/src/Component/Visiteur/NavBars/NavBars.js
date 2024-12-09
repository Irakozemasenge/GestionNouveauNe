/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TranslateComponent from '../TranslateComponent/TranslateComponent';
import { useTheme } from '../UseContext/ThemeContext';

import axios from 'axios';
import { Popover, Sidenav, Whisper } from 'rsuite';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';


function NavBarsVisiteur({ HundlwScrollTop }) {
    const { pathname } = useLocation()

    let acceuil = /^\/acceuil.*/
    let service = /^\/service.*/
    let Publicite = /^\/Publicite.*/
    let demandServer = /^\/demandServer.*/
    let propos = /^\/propos.*/


    const [menu, SetMenue] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth < 1170);
    const [mobile11, setMobile11] = useState(window.innerWidth < 970);
    const [mobile12, setMobile12] = useState(window.innerWidth < 805);
    const [mobile13, setMobile13] = useState(window.innerWidth < 495);
    const [mobile1, setMobile1] = useState(window.innerWidth < 374);

    const [loadings, Setloadings] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 1170);
            setMobile1(window.innerWidth < 374);
            setMobile11(window.innerWidth < 970);
            setMobile12(window.innerWidth < 805);
            setMobile13(window.innerWidth < 495);
            SetMenue(false);
        };

        const handleClick = () => {
            SetMenue(false);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const { isDark, toggleDarkMode, SetIsLogin, SeisGoSite, isAdmin } = useTheme();

    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8005/coord')
            .then(response => {
                setData(response.data);
                Setloadings(false)
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des coordonnées: ", error);
                Setloadings(false)
            });
    }, []);

    const navig = useNavigate()
    return (
        <div className={`flex justify-between relative items-center px-2  border-b border-[#5dca32] w-full ${mobile ? 'h-[8vh] ' : 'h-[13vh] '}`}>
            {loadings && <SpinnerDemarage />}
            <Link to='/' className='flex h-full items-center hover:no-underline focus:no-underline'>
                <div className='w-max h-full '>
                    <img src='images/sloger.png' draggable={false} alt=' ' className='w-full h-full object-cover' />
                </div>
                <div className={`font-serif text-[#5dca32] ${mobile1 ? 'hidden' : mobile13 ? 'text-[15px]' : 'text-[30px]'} `}>
                    HATHA S.U
                </div>
            </Link>
            <div className='h-full w-max flex items-end'>
                <div className={`flex  ${mobile ? 'items-ceter' : 'items-end'}`}>
                    <div className={`flex flex-col `}>
                        <div className={`${mobile12 ? 'hidden' : 'flex '} w-max  mb-2 items-center`}>
                            <div className=' p-1 flex items-center font-semibold font-sans'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="bi text-[#5dca32] bi-telephone-fill">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                                <div className='ml-1'>
                                    <a className='mx-1' href='tel:+257 62681094'>
                                        {data.tel}
                                    </a>
                                </div>
                            </div>

                            <Whisper
                                trigger="hover"
                                placement='auto'
                                speaker={
                                    <Popover>
                                        {data.address}
                                    </Popover>
                                }
                            >
                                <div className=' ml-4 cursor-pointer p-1 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi text-[#5dca32] bi-telephone-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>

                                    <div className='ml-2'>
                                        {data.address && data.address.length > 15 ? data.address.slice(0, 15) + "..." : data.address}
                                    </div>

                                </div>
                            </Whisper>
                            <Whisper
                                trigger="hover"
                                placement='auto'
                                speaker={
                                    <Popover>
                                        {data.email}
                                    </Popover>
                                }
                            >
                                <div className=' ml-4 p-1 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi text-[#5dca32] bi-telephone-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                    </svg>
                                    <a href={`mailto:${data.email}`} className='ml-2'>
                                        {data.email && data.email.length > 15 ? data.email.slice(0, 15) + "..." : data.email}
                                    </a>
                                </div>
                            </Whisper>
                        </div>

                        <div className={` ${mobile ? 'hidden' : 'flex '} items-end `}>
                            {acceuil.test(pathname) || pathname == '/' ? (
                                <Link to='/' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline border-b-2 border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32]  rounded-t-lg'>
                                    Acceuil
                                </Link>
                            ) : (
                                <Link to='/' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline  mx-1 text-[17px] rounded p-2  '>
                                    Acceuil
                                </Link>
                            )}

                            {service.test(pathname) ? (
                                <Link to='/service' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32] rounded-t-lg'>
                                    Service
                                </Link>
                            ) : (
                                <Link to='/service' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 '>
                                    Service
                                </Link>
                            )}

                            {Publicite.test(pathname) ? (
                                <Link to='/Publicite' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32] rounded-t-lg'>
                                    Publicité
                                </Link>
                            ) : (
                                <Link to='/Publicite' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 '>
                                    Publicité
                                </Link>
                            )}



                            {demandServer.test(pathname) ? (
                                <Link to='/demandServer' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32] rounded-t-lg'>
                                    Demande
                                </Link>
                            ) : (
                                <Link to='/demandServer' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 '>
                                    Demande
                                </Link>
                            )}


                            {propos.test(pathname) ? (
                                <Link to='/propos' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32] rounded-t-lg'>
                                    À propos
                                </Link>
                            ) : (
                                <Link to='/propos' onClick={HundlwScrollTop} className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 '>
                                    À propos
                                </Link>
                            )}
                            <div className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 cursor-pointer'></div>
                        </div>
                    </div>

                    {isAdmin &&
                        <Whisper
                            trigger="hover"
                            placement='auto'
                            speaker={
                                <Popover className='text-nowrap'>
                                    Aller à l'interface administrateur
                                </Popover>
                            }
                        >
                            <div onClick={() => { SeisGoSite(false); navig("/") }} className='bg-green-100 mb-1 relative px-3 py-2 mr-5 rounded-lg cursor-pointer flex justify-center items-center'>
                                Retour
                            </div>
                        </Whisper>
                    }
                    {isAdmin ? null :
                        (
                            <>
                                <TranslateComponent />
                                {mobile13 && <div onClick={() => SetIsLogin(true)} className='p-2   ml-2 h-max  relative top-1 bg-green-100 hover:bg-green-300 cursor-pointer text-[#5dca32] rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg>
                                </div>
                                }
                                {!mobile13 &&
                                    <div onClick={() => SetIsLogin(true)} className={`w-max bg-green-50 mx-1  hover:bg-green-100 cursor-pointer text-[#5dca32] ${mobile1 ? 'p-1 h-8' : 'p-2'} rounded`}>
                                        Se connecter
                                    </div>
                                }
                                <div onClick={toggleDarkMode} className='relative  p-1 ml-2 h-max'>
                                    {isDark === "dark" ?
                                        <div className='p-2  bg-green-100 hover:bg-green-300 cursor-pointer text-[#5dca32] rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill animate-spin" viewBox="0 0 16 16">
                                                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                            </svg>
                                        </div>
                                        :
                                        <div className='p-2 bg-green-100 hover:bg-green-300 cursor-pointer text-[#5dca32] rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
                                                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                                            </svg>
                                        </div>
                                    }
                                </div>
                            </>
                        )
                    }


                    <div
                        className={`sm:mx-2 mx-0.5 cursor-pointer h-max relative top-2 p-1 text-white rounded bg-gradient-to-r from-[#5dca32] to-[#8cff5e] hover:from-[#5ee429] hover:to-[#32631e] transition-all ${mobile ? 'block' : 'hidden'}`}>

                        <div onClick={(e) => {
                            SetMenue(!menu);
                            e.stopPropagation()
                        }} className="">

                            {menu ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </>
                            )}
                        </div>
                    </div>


                    <div className={`w-[14em] ${menu ? 'right-0' : '-right-full'} transition-all fixed z-[200000000000] top-[8vh]  h-full  border-r-2 border-orange-300  flex-col items-center ${mobile ? 'flex' : 'hidden'} `}>
                        <Sidenav>
                            <div className="w-full  h-[92vh] overflow-x-hidden overflow-y-auto">

                                <div className="w-full h-[100%] flex flex-col">

                                    {acceuil.test(pathname) || pathname == '/' ? (
                                        <Link to='/' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32]'>
                                            Acceuil
                                        </Link>
                                    ) : (
                                        <Link to='/' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2  '>
                                            Acceuil
                                        </Link>
                                    )}


                                    {service.test(pathname) ? (
                                        <Link to='/service' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32]'>
                                            Service
                                        </Link>
                                    ) : (
                                        <Link to='/service' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2  '>
                                            Service
                                        </Link>
                                    )}

                                    {Publicite.test(pathname) ? (
                                        <Link to='/Publicite' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32]'>
                                            Publicité
                                        </Link>
                                    ) : (
                                        <Link to='/Publicite' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2  '>
                                            Publicité
                                        </Link>
                                    )}
                                    {demandServer.test(pathname) ? (
                                        <Link to='/demandServer' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32]'>
                                            Demande
                                        </Link>
                                    ) : (
                                        <Link to='/demandServer' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2  '>
                                            Demande
                                        </Link>
                                    )}

                                    {propos.test(pathname) ? (
                                        <Link to='/propos' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#5dca32] text-[17px] mx-1 cursor-pointer text-[#5dca32] focus:text-[#5dca32] hover:text-[#5dca32]'>
                                            À propos
                                        </Link>
                                    ) : (
                                        <Link to='/propos' onClick={HundlwScrollTop} className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2  '>
                                            À propos
                                        </Link>
                                    )}

                                </div>
                            </div>
                        </Sidenav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarsVisiteur








