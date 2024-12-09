/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import TranslateComponent from '../../TranslateComponent/TranslateComponent';

function NavBarsVisiteur() {
    const { pathname } = useLocation()
    let acceuil = /^\/acceuil.*/
    let bourse = /^\/bourse.*/
    let universite = /^\/universite.*/
    let travail = /^\/travail.*/
    let evenement = /^\/evenement.*/
    let VisaVisiteur = /^\/VisaVisiteur.*/
    let propos = /^\/propos.*/



    const [menu, SetMenue] = useState(false);
    const [mobile, Setmobile] = useState(window.innerWidth < 1170);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 710);

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

    return (
        <div className={`flex justify-between relative items-center px-2  border-b border-[#ca3232] w-full ${mobile ? 'h-[8vh] ' : 'h-[13vh] '}`}>
            <Link to='/' className='w-max h-full '>
                <img src='https://speedreal.abahs-jobconnect.com/uploads/Logo/abahs.jpg' draggable={false} alt='     ' className='w-full h-full object-cover' />
            </Link>
            <div className='h-full w-max flex items-end'>
                <div className={`flex  ${mobile ? 'items-center' : 'items-end'}`}>
                    <div className={`flex flex-col `}>
                        <div className={`${mobile1 ? 'hidden' : 'flex '} w-max  mb-2 items-center`}>
                            <div className=' p-1 flex items-center font-semibold font-sans'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg>
                                <div className='ml-1'>
                                    <a className='mx-1' href='tel:+257 62895970'>
                                        +257/62895970
                                    </a>,
                                    <a className='mx-1' href='tel:+257 62556103'>
                                        62556103
                                    </a>
                                </div>
                            </div>

                            <div className=' ml-4 p-1 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                                </svg>
                                <a href='mailto:anicet-niyonkuru@abahs-jobconnect.com' className='ml-2'>
                                    anicet-niyonkuru@abahs-jobconnect.com
                                </a>
                            </div>
                        </div>

                        <div className={` ${mobile ? 'hidden' : 'flex '} items-end `}>
                            {acceuil.test(pathname) || pathname == '/' ? (
                                <Link to='/' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]  rounded-t-lg'>
                                    Acceuil
                                </Link>
                            ) : (
                                <Link to='/' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                    Acceuil
                                </Link>
                            )}

                            {bourse.test(pathname) ? (
                                <Link to='/bourse' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232] rounded-t-lg'>
                                    Recherche de bourse
                                </Link>
                            ) : (
                                <Link to='/bourse' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 text-black hover:text-black'>
                                    Recherche de bourse
                                </Link>
                            )}

                            {universite.test(pathname) ? (
                                <Link to='/universite' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232] rounded-t-lg'>
                                    Recherche d'Etudes
                                </Link>
                            ) : (
                                <Link to='/universite' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 text-black hover:text-black'>
                                    Recherche d'Etudes
                                </Link>
                            )}



                            {travail.test(pathname) ? (
                                <Link to='/travail' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232] rounded-t-lg'>
                                    Recherche de travail
                                </Link>
                            ) : (
                                <Link to='/travail' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 text-black hover:text-black'>
                                    Recherche de travail
                                </Link>
                            )}

                            {evenement.test(pathname) ? (
                                <Link to='/evenement' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232] rounded-t-lg'>
                                    Evénement
                                </Link>
                            ) : (
                                <Link to='/evenement' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 text-black hover:text-black'>
                                    Evénement
                                </Link>
                            )}
                            {VisaVisiteur.test(pathname) ? (
                                <Link to='/VisaVisiteur' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232] rounded-t-lg'>
                                    VISA
                                </Link>
                            ) : (
                                <Link to='/VisaVisiteur' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 text-black hover:text-black'>
                                    VISA
                                </Link>
                            )}

                            {propos.test(pathname) ? (
                                <Link to='/propos' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline   border-b-2 border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232] rounded-t-lg'>
                                    A propos
                                </Link>
                            ) : (
                                <Link to='/propos' className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 rounded p-2 text-black hover:text-black'>
                                    A propos
                                </Link>
                            )}
                            <div className='w-max h-max px-3 py-1 hover:no-underline focus:no-underline text-[17px] mx-1 cursor-pointer'></div>
                        </div>
                    </div>
                    <TranslateComponent />
                    <div
                        className={`sm:mx-2 mx-0.5 mb-2 cursor-pointer h-max  p-1 text-white rounded bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-700 hover:to-orange-500 transition-all ${mobile ? 'block' : 'hidden'}`}>

                        <div onClick={(e) => {
                            SetMenue(!menu);
                            e.stopPropagation()
                        }}>

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
                        <div className="w-full  h-full overflow-x-hidden overflow-y-auto border-t-2 border-orange-500">
                            <div className="w-full h-[100%] flex flex-col bg-white">

                                {acceuil.test(pathname) || pathname == '/' ? (
                                    <Link to='/' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        Acceuil
                                    </Link>
                                ) : (
                                    <Link to='/' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        Acceuil
                                    </Link>
                                )}


                                {bourse.test(pathname) ? (
                                    <Link to='/bourse' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        Recherche de bourse
                                    </Link>
                                ) : (
                                    <Link to='/bourse' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        Recherche de bourse
                                    </Link>
                                )}

                                {universite.test(pathname) ? (
                                    <Link to='/universite' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        Recherche d'Etudes
                                    </Link>
                                ) : (
                                    <Link to='/universite' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        Recherche d'Etudes
                                    </Link>
                                )}



                                {travail.test(pathname) ? (
                                    <Link to='/travail' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        Recherche de travail
                                    </Link>
                                ) : (
                                    <Link to='/travail' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        Recherche de travail
                                    </Link>
                                )}

                                {evenement.test(pathname) ? (
                                    <Link to='/evenement' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        Evénement
                                    </Link>
                                ) : (
                                    <Link to='/evenement' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        Evénement
                                    </Link>
                                )}


                                {VisaVisiteur.test(pathname) ? (
                                    <Link to='/VisaVisiteur' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        VISA
                                    </Link>
                                ) : (
                                    <Link to='/VisaVisiteur' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        VISA
                                    </Link>
                                )}


                                {propos.test(pathname) ? (
                                    <Link to='/propos' className='w-full h-max px-3 mt-1 py-1 border-l-2  border-[#ca3232] text-[17px] mx-1 cursor-pointer text-[#ca3232] focus:text-[#ca3232] hover:text-[#ca3232]'>
                                        A propos
                                    </Link>
                                ) : (
                                    <Link to='/propos' className='w-full h-max px-3 mt-1 py-1  mx-1 text-[17px] rounded p-2 text-black hover:text-black '>
                                        A propos
                                    </Link>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarsVisiteur




