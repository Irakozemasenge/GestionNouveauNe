/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Sidenav } from "rsuite";
function SlideAdmin({ getMenuMobille }) {
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



    const [mobile, SetMobile] = useState(window.innerWidth < 1292)
    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 1292)
            SetMobile11(window.innerWidth < 501)
        }

        window.addEventListener('resize', hundleSize)


        return () => window.removeEventListener('resize', hundleSize)
    }, [])


    return (
        <>
            <div className={`  border-r-2 border-[#5dca32] w-[15em]  overflow-y-auto overflow-x-hidden min-w-[13em] ${mobile ? 'fixed  z-[100]' : ''} ${getMenuMobille ? 'left-0' : '-left-full'} transition-all duration-300 ${mobile11 ? 'top-[10vh] h-[90vh]' : 'top-[15vh] h-[87vh]'} `}>
                {!mobile && (
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
                                                        Tâches
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
                                                        Tâches
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
                                                        Publicités
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
                                                        Publicités
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
                                                        Messages
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
                                                        Messages
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
                                                        Contrats
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
                                                        Contrats
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill w-8 h-8" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Coordonnées
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/coordonne/Ajout">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline  hover:text-gray-400 flex items-center p-2 group">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill w-8 h-8" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Coordonnées
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
                                                        Horaires
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
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Horaires
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
                                                        Réseaux
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
                                                        Réseaux
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    )}
                                </ul>
                                <a target="_blank" href="mailto:btr.dev@burundientempsreel.com" className="text-green-600 cursor-pointer hover:text-gray-600 py-2 mb-4  flex pl-5 items-center">
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

                )
                }
            </div>
        </>
    );
}

export default SlideAdmin;





