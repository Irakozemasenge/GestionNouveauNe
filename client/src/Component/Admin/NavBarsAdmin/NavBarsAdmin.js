/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { Popover, Radio, RadioGroup, Sidenav, Whisper } from 'rsuite';
import { Icon } from '@rsuite/icons';
import axios from 'axios';
import TranslateComponent from '../../TranslateComponent/TranslateComponent';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
import { useTheme } from '../../Visiteur/UseContext/ThemeContext';
import { decryptData } from '../../../encryptionModule';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import NotificationSound from './call-to-attention-123107.mp3';

function NavBarsAdmin() {

    // const [ip, setIp] = useState(null);
    // const [playAudio, setPlayAudio] = useState(true)
    /*
        useEffect(() => {
            const fetchIp = async () => {
                try {
                    const response = await publicIp(); // Use publicIp for combined IPv4/IPv6
                    setIp(response);
                } catch (error) {
                    console.error('Error fetching IP address:', error);
                    // Handle error gracefully, e.g., display a message to the user
                }
            };
    
            fetchIp();
        }, []);
    
    */


    const handleClick = () => {
        if (!("Notification" in window)) {
            alert("Ce navigateur ne supporte pas les notifications bureau");
        } else if (Notification.permission === "granted") {
            showNotification();
            console.log("granted")
        } else if (Notification.permission !== "denied") {
            console.log("denied")
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    showNotification();
                    console.log("granted2")
                }
            });
        }
    }

    const showNotification = () => {
        new Notification("Nouveau Message", {
            body: "Un nouveau message s'il vous plaît, veuillez le voir.",
            icon: 'http://localhost:8005/uploads/Logo/btr.png?    auto=compress&cs=tinysrgb&dpr=1&w=500',
            dir: 'ltr'
        });
    }

    const socket = useRef();
    const uniqueId = uuidv4();
    // Connect to Socket.io
    useEffect(() => {

        socket.current = io("ws://localhost:8006");
        socket.current.emit("new-user-add", {
            role: "Admin",
            userId: uniqueId,
            //ipAddress: ip,
        });

    }, []);




    const [ingo, getIngo] = useState([])
    useEffect(() => {
        const handleNewMessage = (data) => {
            console.log("new-message", data);
            handleClick();
            getIngo(prevMessages => [...prevMessages, data]);
            playNotificationSound();
        };

        if (socket.current) {
            socket.current.on("new-message", handleNewMessage);
            return () => socket.current.off("new-message", handleNewMessage);
        }
    }, [ingo]);

    // Cette fonction déclenche la lecture audio
    const playNotificationSound = () => {
        const audio = new Audio(NotificationSound);
        audio.play().then(() => {
            console.log("Done");
        }).catch((err) => {
            console.log("error", err.message);
        });
    };


    const [loadings, Setloadings] = useState(true);

    const [mobile, SetMobile] = useState(window.innerWidth < 1292)
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 317)
    const [menu, SetMenue] = useState(false);
    useEffect(() => {

        const hundleSize = () => {
            SetMobile(window.innerWidth < 1292)
            SetMobile1(window.innerWidth < 688)
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


    const { pathname } = useLocation()
    let acceuil = /^\/acceuil.*/
    let Client = /^\/Client.*/
    let tache = /^\/tache.*/
    let Publicite = /^\/Publicite.*/
    let message = /^\/message.*/
    let contrant = /^\/contrant.*/
    let service = /^\/service.*/
    let coordonne = /^\/coordonne.*/
    let horaire = /^\/horaire.*/
    let sociauxmedia = /^\/sociauxmedia.*/

    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 1292)
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

    const { triggerRef, close, handleChange, isDarkadimin, SeisGoSite } = useTheme();
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
    const idcr = localStorage.getItem("xtoks");
    const id = decryptData(idcr)
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8005/admin/getOne/${id}`).then((rep) => {
            setUser(rep.data)
            Setloadings(false)
        }).catch((err) => {
            console.log(err.message)
            Setloadings(false)
        })
    }, [id])
    const navigate = useNavigate()
    const deconnectionFun = () => {
        localStorage.removeItem("xtoks")
        navigate("/")
        window.location.reload()
    }

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


    const navig = useNavigate()

    return (
        <div className={`flex justify-between items-center ${mobille1 ? 'px-1' : 'px-2 '}  border-b border-[#5dca32] w-full ${mobile1 ? 'h-[8vh]' : 'h-[13vh]'}`}>
            {loadings && <SpinnerDemarage />}
            <div
                className={`sm:mx-2 mx-0.5 cursor-pointer h-max  p-1 text-white rounded bg-gradient-to-r from-[#5dca32] to-[#8cff5e] hover:from-[#5ee429] hover:to-[#32631e] transition-all ${mobile ? 'block' : 'hidden'}`}>
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

            {/* <button onClick={handleClick} >
                Afficher la notification
            </button> */}
            <Link to='/' className='flex h-full items-center  hover:no-underline focus:no-underline'>
                <div className='w-max h-full'>
                    <img src='images/sloger.png' draggable={false} alt=' ' className='w-full h-full object-contain' />
                </div>
                <div className={`text-[30px] font-serif text-green-600 ${mobille ? 'hidden' : ''} `}>
                    HATHA S.U
                </div>
            </Link>

            <div className='h-full w-max  flex items-end'>
                <div className='h-full flex items-center ml-1 sm:ml-4'>
                    <Whisper
                        trigger="hover"
                        placement='auto'
                        speaker={
                            <Popover className='text-nowrap'>
                                Aller au site
                            </Popover>
                        }
                    >
                        <div onClick={() => { SeisGoSite(true); navig("/") }} className='bg-green-100 mb-1 relative  px-3 py-2 mr-5 rounded-lg cursor-pointer flex justify-center items-center'>
                            {mobille1 ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5dca32" class="bi bi-repeat" viewBox="0 0 16 16">
                                    <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                                </svg> :
                                <> Aller au site</>
                            }



                        </div>
                        {/* <Link onClick={() => { getIngo([]); handleClick() }} to="/message" className='bg-green-100  relative w-[30px] h-[30px] mr-5 rounded-full cursor-pointer flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5dca32" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                            </svg>
                            <div className='absolute -top-2 text-red-600 font-extrabold  -right-2'>
                                {ingo.length}
                            </div>
                        </Link> */}
                    </Whisper>

                    <TranslateComponent />
                    <div className='w-max h-max relative'>
                        <Whisper
                            placement='auto'
                            trigger='click'
                            ref={triggerRef}
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
                                                    src={`http://localhost:8005/uploads/Admin/${user.photo}`} alt="    " className='w-full h-full object-cover' />
                                            </div>
                                            <Link onClick={close} to='/compte' className=' mt-2 italic text-[20px]'>{user.nom_complet}</Link>
                                        </div>
                                        <div className="w-full h-[1px] my-2 bg-slate-300"></div>
                                        <p className="text-[17px] my-1 cursor-default">Thème</p>
                                        <RadioGroup name="radio-name" value={isDarkadimin} onChange={handleChange}>
                                            <label htmlFor="lumi" className={`flex px-2 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center ${isDarkadimin === 'light' ? 'text-[#5dca32]' : null}`}>
                                                <div className="flex items-center justify-start w-[15em]  ">
                                                    <div className="mr-2">
                                                        <Icon as={Sun} />
                                                    </div>
                                                    <div className="text-[18px]">Mode lumière</div>
                                                </div>
                                                <div className=" flex w-7"> <Radio id="lumi" checked={isDarkadimin === 'light'} value="light"></Radio></div>
                                            </label>
                                            <label htmlFor="sombe" className={`flex px-2 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center ${isDarkadimin === 'dark' ? 'text-[#5dca32]' : null}`}>
                                                <div className="flex items-center w-[15em] ">
                                                    <div className="mr-2"><Icon as={Moon} /></div>
                                                    <div className="text-[18px]">Mode sombre</div>
                                                </div>
                                                <div className=" flex w-7 "> <Radio id="sombe" checked={isDarkadimin === 'dark'} value="dark"></Radio></div>
                                            </label>

                                            <label htmlFor="contrast" className={`flex px-2 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center ${isDarkadimin === 'high-contrast' ? 'text-[#5dca32]' : null}`}>
                                                <div className="flex  w-[15em] items-center">
                                                    <div className="mr-2"><Icon as={SemiMoon} /></div>
                                                    <div className="text-[17px]">Mode contraste</div>
                                                </div>
                                                <div className=" flex w-7 ">
                                                    <Radio id="contrast" checked={isDarkadimin === 'high-contrast'} value="high-contrast"></Radio></div>
                                            </label>
                                        </RadioGroup>
                                        <div className="w-full h-[1px] my-2 bg-slate-300"></div>
                                        <div className={`flex p-2 mb-1 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center `}>
                                            <div className="flex  w-[15em] items-center" onClick={deconnectionFun}>
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
                                        src={`http://localhost:8005/uploads/Admin/${user.photo}`} alt='    ' className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </Whisper>
                    </div>            </div>
            </div>


            {/* Nav mobile */}
            <div className={`w-[14em] ${menu ? 'left-0' : '-left-full'} transition-all fixed z-[200000000000] top-[13vh] max-sm:top-[8vh]  h-full  border-r-2 border-orange-300  flex-col items-center ${mobile ? 'flex' : 'hidden'} `}>

                <Sidenav size='13em' placement="left" style={{ height: '100%' }} >
                    <div className="p-1 mb-5 border-b border-white">
                        <div class="flex-1 flex flex-col pt-5 overflow-x-hidden pb-4 overflow-y-auto">
                            <div class="flex-1 px-1 h-full  divide-y space-y-1">
                                <ul class="space-y-2 pb-2">
                                    {acceuil.test(pathname) || pathname === "/" ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group">
                                                    <svg
                                                        class="w-6 h-6 text-[#5dca32]  transition duration-75"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Accueil
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline no-underline text-inherit  hover:text-gray-400  flex items-center p-2 group">
                                                    <svg
                                                        class="w-6 h-6  transition duration-75"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Accueil
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {Client.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/Client/ajouter">
                                            <li>
                                                <div
                                                    target="_blank"
                                                    class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group"
                                                >   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi h-6 w-6 bi-person-standing-dress" viewBox="0 0 16 16">
                                                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Clients
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/Client/ajouter">
                                            <li>
                                                <div

                                                    class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group"
                                                >

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi  h-6 w-6 bi-person-standing-dress" viewBox="0 0 16 16">
                                                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 text-nowrap">
                                                        Clients
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}






                                    {tache.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/tache/ajouter">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-walking w-6 h-6" viewBox="0 0 16 16">
                                                        <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        tache
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/tache/ajouter">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-walking w-6 h-6" viewBox="0 0 16 16">
                                                        <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        tache
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}


                                    {Publicite.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/Publicite/ajouter">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi -rotate-[20deg] h-6 w-6 bi-megaphone-fill" viewBox="0 0 16 16">
                                                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Publicite
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/Publicite/ajouter">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi -rotate-[20deg] h-6 w-6 bi-megaphone-fill" viewBox="0 0 16 16">
                                                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Publicite
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {message.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/message">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi -rotate-[90deg] h-6 w-6 bi-chat-square-dots-fill" viewBox="0 0 16 16">
                                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Message
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/message">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi -rotate-[90deg] h-6 w-6 bi-chat-square-dots-fill" viewBox="0 0 16 16">
                                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Message
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {contrant.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/contrant/ajouter">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi h-6 w-6 bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                                                        <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                                        <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Contrant
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/contrant/ajouter">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi h-6 w-6 bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
                                                        <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                                        <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Contrant
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {service.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/service/ajouter">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools h-6 w-6" viewBox="0 0 16 16">
                                                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Services
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/service/ajouter">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools h-6 w-6" viewBox="0 0 16 16">
                                                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Services
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {coordonne.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/coordonne/Ajout">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill w-6 h-6" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Coordonne
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/coordonne/Ajout">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill w-6 h-6" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Coordonne
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {horaire.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/horaire/Ajout">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        horaire
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/horaire/Ajout">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 ">
                                                        Horaire
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}
                                    {sociauxmedia.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/sociauxmedia/Ajout">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
                                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Réseau
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/sociauxmedia/Ajout">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
                                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Réseau
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}
                                </ul>
                                <a target="_blank" href="mailto:btr.dev@burundientempsreel.com" rel="noreferrer" className="text-green-600 cursor-pointer hover:text-gray-600 py-2 mb-4  flex pl-5 items-center">
                                    <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mr-3 h-6 w-6 bi-question-diamond-fill" viewBox="0 0 16 16">
                                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                                    </svg></div>
                                    <div>
                                        Aide
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </Sidenav>
            </div>
        </div>

    )
}

export default NavBarsAdmin
