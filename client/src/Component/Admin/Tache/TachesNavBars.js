/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Popover, Whisper } from 'rsuite';
function NavBarstache() {
    const url = window.location.pathname;
    const { pathname } = useLocation()

    let tacheList = /^\/tache.*/
    let tacheCote = /^\/tache\/cote.*/
    let tachearchive = /^\/tache\/expire.*/


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
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover className='text-nowrap'>
                        <div>Ajouter une nouvelle tache</div>
                    </Popover>
                }
            >
                <Link className={`h-max ${mobile3 ? 'text-[13px] px-2 py-1' : 'px-3 py-1 text-[20px]'} w-max rounded-lg  relative text-nowrap  hover:no-underline focus:no-underline bg-[#00800018] flex items-end ${(url == "/tache/ajouter") && "border-[[#5dca32]] hover:text-[#5dca32] focus:text-[#5dca32] text-[#5dca32]"}`} to='/tache/ajouter' >
                    Ajouter
                </Link>
            </Whisper>
            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover className='text-nowrap'>
                        <div>Listes des taches</div>
                    </Popover>
                }
            >
                <Link className={`h-max ${mobile3 ? 'text-[13px] px-2 py-1' : 'px-3 py-1 text-[20px]'} w-max rounded-lg  relative text-nowrap  hover:no-underline focus:no-underline bg-[#00800018] flex items-end ${(tacheList.test(pathname)) && pathname !== '/tache/ajouter' && !tacheCote.test(pathname) && !tachearchive.test(pathname) ? "border-[#5dca32] hover:text-[#5dca32] focus:text-[#5dca32] text-[#5dca32]" : null}`} to='/tache'>
                    Affiche
                </Link>
            </Whisper>


            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover className='text-nowrap'>
                        <div> Tache à coté</div>
                    </Popover>
                }
            >
                <Link className={`h-max ${mobile3 ? 'text-[13px] px-2 py-1' : 'px-3 py-1 text-[20px]'} w-max rounded-lg  relative text-nowrap  hover:no-underline focus:no-underline bg-[#00800018] flex items-end ${tacheCote.test(pathname) ? "border-[#5dca32] hover:text-[#5dca32] focus:text-[#5dca32] text-[#5dca32]" : null}`} to="/tache/cote">
                    Coté
                </Link>
            </Whisper>

            <Whisper
                trigger='hover'
                placement='auto'
                speaker={
                    <Popover className='text-nowrap'>
                        <div> Tache expire</div>
                    </Popover>
                }
            >
                <Link className={`h-max ${mobile3 ? 'text-[13px] px-2 py-1' : 'px-3 py-1 text-[20px]'} w-max rounded-lg  relative text-nowrap  hover:no-underline focus:no-underline bg-[#00800018] flex items-end  ${tachearchive.test(pathname) && "border-[#5dca32] hover:text-[#5dca32] focus:text-[#5dca32] text-[#5dca32]"}`} to="/tache/expire">
                    Expire
                </Link>
            </Whisper>

        </div>
    )
} export default NavBarstache
