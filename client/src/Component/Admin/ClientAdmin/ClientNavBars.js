/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Popover, Whisper } from 'rsuite';
function ClientNavBars() {
    const url = window.location.pathname;
    const { pathname } = useLocation()
    let ClientList = /^\/Client.*/
    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={` border-b border-[#5dca322f]   ${mobile3 ? 'h-[5.5vh]' : 'h-[8vh]'}  px-2 flex justify-between items-center`}>
            <Whisper
                trigger="hover"
                placement='bottom'
                speaker={
                    <Popover className='text-nowrap'>
                        Ajoute un client
                    </Popover>
                }
            >
                <Link className={`h-max ${mobile3 ? 'text-[13px] px-2 py-1' : 'px-3 py-1 text-[20px]'} w-max rounded-lg  relative text-nowrap  hover:no-underline focus:no-underline bg-[#00800018] flex items-end ${(url == "/Client/ajouter") && "border-[#5dca32] hover:text-[#5dca32] focus:text-[#5dca32] text-[#5dca32]"}`} to='/Client/ajouter' >
                    Ajouter
                </Link>
            </Whisper>

            <Whisper
                trigger="hover"
                placement='auto'
                speaker={
                    <Popover className='text-nowrap'>
                        Affiche la liste des clients
                    </Popover>
                }
            >
                <Link className={`w-max ${mobile3 ? 'text-[13px] px-2 py-1' : 'px-3 py-1 text-[20px]'}  relative text-nowrap bg  rounded-lg  bg-[#00800023] hover:no-underline focus:no-underline h-max flex items-end m-2 ${(ClientList.test(pathname)) && pathname !== '/Client/ajouter' ? "border-[#5dca32] hover:text-[#5dca32] bg-[#00800009] focus:text-[#5dca32] text-[#5dca32]" : null}`} to='/Client'>
                    Afficher
                </Link>
            </Whisper>
        </div>
    )
} export default ClientNavBars

