/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Popover, Whisper } from "rsuite";
import { useThemes } from "../../UserContext/UserContext";
function SlideNavBars() {
    const { pathname } = useLocation()
    let acceuil = /^\/acceuil.*/
    let med = /^\/med.*/
    let enf = /^\/enf.*/
    let pers = /^\/pers.*/
    let userMed = /^\/userMed.*/
    let consult = /^\/consult.*/
    let Vaccination = /^\/Vaccination.*/

    let hopit = /^\/hopit.*/
    const { mobile, menu, GetMenue } = useThemes()
    return (
        <>

            <div className={`  border-r-2 border-[#5dca32]  overflow-y-auto overflow-x-hidden  ${mobile ? 'fixed  w-[80%]   z-[100]' : ' w-[15%]'} ${menu ? 'left-0' : '-left-full'} transition-all duration-300 h-[100vh] `}>
                <div className="p-1 mb-5 border-b bg-white border-white">
                    {mobile &&
                        <div onClick={(e) => { GetMenue(false); e.stopPropagation() }} className="m-2 bg-[#5dca322d] w-max p-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5dca32" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </div>
                    }
                    <div class="flex-1 flex flex-col pt-5 overflow-x-hidden pb-4 overflow-y-auto">
                        <div>
                            <img src="image/logos.jpg" alt='    ' />
                        </div>
                        <div class="flex-1 px-1 h-full  divide-y space-y-1">
                            <ul class="space-y-2 pb-2">
                                {acceuil.test(pathname) || pathname === "/" ? (
                                    <Link className="hover:no-underline focus:no-underline" to="/">
                                        <li>
                                            <div class="font-normal text-[17px] hover:no-underline text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                                                </svg>
                                                <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                    Accueil
                                                </span>

                                            </div>
                                        </li>
                                    </Link>
                                ) : (
                                    <Link className="hover:no-underline focus:no-underline" to="/">
                                        <li>
                                            <div class="font-normal text-[17px] hover:no-underline no-underline text-inherit  hover:text-gray-400  flex items-center p-2 group">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                                                </svg>
                                                <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                    Accueil
                                                </span>

                                            </div>
                                        </li>
                                    </Link>
                                )}

                                {med.test(pathname) ? (
                                    <Link className="hover:no-underline focus:no-underline" to="/med">
                                        <li>
                                            <div
                                                target="_blank"
                                                class="text-[17px] font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group"
                                            > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capsule" viewBox="0 0 16 16">
                                                    <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                                                </svg>
                                                <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                    Médicament
                                                </span>

                                            </div>
                                        </li>
                                    </Link>
                                ) : (
                                    <Link className="hover:no-underline focus:no-underline" to="/med">
                                        <li>
                                            <div class="font-normal text-[17px] hover:no-underline no-underline text-inherit  hover:text-gray-400  flex items-center p-2 group">

                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capsule" viewBox="0 0 16 16">
                                                    <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                                                </svg>

                                                <span class="ml-3 flex-1 text-nowrap">
                                                    Médicament
                                                </span>
                                            </div>
                                        </li>
                                    </Link>
                                )}
                                {pers.test(pathname) ? (
                                    <Link className="hover:no-underline focus:no-underline" to="/pers">
                                        <li>
                                            <div
                                                target="_blank"
                                                class="text-[17px] font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group"
                                            > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                                                </svg>
                                                <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                    Personne
                                                </span>

                                            </div>
                                        </li>
                                    </Link>
                                ) : (
                                    <Link className="hover:no-underline focus:no-underline" to="/pers">
                                        <li>
                                            <div

                                                class="text-[17px]  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group"
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                                                </svg>

                                                <span class="ml-3 flex-1 text-nowrap">
                                                    Personne
                                                </span>
                                            </div>
                                        </li>
                                    </Link>
                                )}


                                {enf.test(pathname) ? (
                                    <Link className="hover:no-underline focus:no-underline" to="/enf">
                                        <li>
                                            <div
                                                target="_blank"
                                                class="text-[17px] font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group"
                                            >   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                                </svg>

                                                <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                    Enfants
                                                </span>

                                            </div>
                                        </li>
                                    </Link>
                                ) : (
                                    <Link className="hover:no-underline focus:no-underline" to="/enf">
                                        <li>
                                            <div

                                                class="text-[17px]  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group"
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                                </svg>

                                                <span class="ml-3 flex-1 text-nowrap">
                                                    Enfants
                                                </span>
                                            </div>
                                        </li>
                                    </Link>
                                )}





                                {userMed.test(pathname) ? (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"
                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des médicaments usage
                                            </Popover>
                                        }
                                    >
                                        <Link className="hover:no-underline focus:no-underline" to="/userMed">
                                            <li>
                                                <div class=" font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capsule-pill" viewBox="0 0 16 16">
                                                        <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 text-[17px] text-nowrap text-ellipsis overflow-hidden">
                                                        Médicaments usage
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                ) : (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"

                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des médicaments usage
                                            </Popover>
                                        }>
                                        <Link className="hover:no-underline focus:no-underline" to="/userMed">
                                            <li>
                                                <div class="font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capsule-pill" viewBox="0 0 16 16">
                                                        <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z" />
                                                    </svg>
                                                    <span class="ml-3 text-[17px] flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Médicaments usage
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                )}


                                {consult.test(pathname) ? (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"

                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des consultations
                                            </Popover>
                                        }>
                                        <Link className="hover:no-underline focus:no-underline" to="/consult">
                                            <li>
                                                <div class="text-[17px] font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Consultations
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                ) : (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"

                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des consultations
                                            </Popover>
                                        }>
                                        <Link className="hover:no-underline focus:no-underline" to="/consult">
                                            <li>
                                                <div class="text-[17px]  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Consultations
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                )}

                                {Vaccination.test(pathname) ? (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"

                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des vaccinations
                                            </Popover>
                                        }>
                                        <Link className="hover:no-underline focus:no-underline" to="/Vaccination">
                                            <li>
                                                <div class="text-[17px] font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-screwdriver" viewBox="0 0 16 16">
                                                        <path d="M0 .995.995 0l3.064 2.19a1 1 0 0 1 .417.809v.07c0 .264.105.517.291.704l5.677 5.676.909-.303a1 1 0 0 1 1.018.24l3.338 3.339a.995.995 0 0 1 0 1.406L14.13 15.71a.995.995 0 0 1-1.406 0l-3.337-3.34a1 1 0 0 1-.24-1.018l.302-.909-5.676-5.677a1 1 0 0 0-.704-.291H3a1 1 0 0 1-.81-.417zm11.293 9.595a.497.497 0 1 0-.703.703l2.984 2.984a.497.497 0 0 0 .703-.703z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Vaccination
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                ) : (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"
                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des vaccinations
                                            </Popover>
                                        }
                                    >
                                        <Link className="hover:no-underline focus:no-underline" to="/Vaccination">
                                            <li>
                                                <div class="text-[17px]  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-screwdriver" viewBox="0 0 16 16">
                                                        <path d="M0 .995.995 0l3.064 2.19a1 1 0 0 1 .417.809v.07c0 .264.105.517.291.704l5.677 5.676.909-.303a1 1 0 0 1 1.018.24l3.338 3.339a.995.995 0 0 1 0 1.406L14.13 15.71a.995.995 0 0 1-1.406 0l-3.337-3.34a1 1 0 0 1-.24-1.018l.302-.909-5.676-5.677a1 1 0 0 0-.704-.291H3a1 1 0 0 1-.81-.417zm11.293 9.595a.497.497 0 1 0-.703.703l2.984 2.984a.497.497 0 0 0 .703-.703z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Vaccinations
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                )}




                                {hopit.test(pathname) ? (
                                    <Whisper
                                        trigger="hover"
                                        placement="right"

                                        speaker={
                                            <Popover className="text-nowrap">
                                                Liste des enfants hospitalisées
                                            </Popover>
                                        }>
                                        <Link className="hover:no-underline focus:no-underline" to="/hopit">
                                            <li>
                                                <div class="text-[17px] font-normal hover:no-underline  text-[#5dca32] border-l-2 border-[#5dca32] flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                                                        <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Hospitalisées
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    </Whisper>
                                ) : (
                                    <Link className="hover:no-underline focus:no-underline" to="/hopit">
                                        <Whisper
                                            trigger="hover"
                                            placement="right"

                                            speaker={
                                                <Popover className="text-nowrap">
                                                    Liste des enfants hospitalisées
                                                </Popover>
                                            }>
                                            <li>
                                                <div class="text-[17px]  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                                                        <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 text-nowrap text-ellipsis overflow-hidden">
                                                        Hospitalisées
                                                    </span>
                                                </div>
                                            </li>
                                        </Whisper>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SlideNavBars;





