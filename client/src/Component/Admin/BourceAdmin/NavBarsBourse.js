/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Popover, Whisper } from 'rsuite';
function NavBarsBourse() {
    const url = window.location.pathname;
    const { pathname } = useLocation()

    let bourseList = /^\/bourse.*/
    let bourseCommed = /^\/bourse\/command.*/
    let boursevalid = /^\/bourse\/valid.*/
    let boursearchive = /^\/bourse\/archive.*/

    console.log("pathname", pathname)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 850)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 850)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className='text-[20px]  h-[7vh] flex justify-between items-end'>
            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover>
                        <div>
                            Liste des bourses
                        </div>
                    </Popover>
                }
            >
                <Link className={`w-full border-b-2 pl-2 h-full flex items-end ${(bourseList.test(pathname)) && pathname !== '/bourse/ajouter' &&  !bourseCommed.test(pathname) && !boursevalid.test(pathname) && !boursearchive.test(pathname) ? "border-orange-600 hover:text-orange-600 focus:text-orange-600 text-orange-600" : null}`} to='/bourse'>
                    {!mobile3 && <> Liste des bourses</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                        <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                    </svg>
                    }
                </Link>
            </Whisper>

            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover>
                        Ajoute la bourse
                    </Popover>
                }
            >
                <Link className={`w-full border-b-2 h-full flex items-end ${(url == "/bourse/ajouter") && "border-orange-600 hover:text-orange-600 focus:text-orange-600 text-orange-600"}`} to='/bourse/ajouter' >
                    {!mobile3 && <>  Ajoute bourse</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                        <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>}
                </Link>
            </Whisper>

            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover>
                        <div> Bourse commande</div>
                    </Popover>
                }
            >
                <Link className={`w-full border-b-2 h-full flex items-end ${bourseCommed.test(pathname) ? "border-orange-600 hover:text-orange-600 focus:text-orange-600 text-orange-600" : null}`} to="/bourse/command">
                    {!mobile3 && <>Bourse commande</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-command" viewBox="0 0 16 16">
                        <path d="M3.5 2A1.5 1.5 0 0 1 5 3.5V5H3.5a1.5 1.5 0 1 1 0-3M6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5zm4 1v4H6V6zm1-1V3.5A1.5 1.5 0 1 1 12.5 5zm0 6h1.5a1.5 1.5 0 1 1-1.5 1.5zm-6 0v1.5A1.5 1.5 0 1 1 3.5 11z" />
                    </svg>}
                </Link>
            </Whisper>

            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover>
                        <div>Bourse valide</div>
                    </Popover>
                }
            >
                <Link className={`w-full border-b-2 h-full flex items-end ${boursevalid.test(pathname) && "border-orange-600 hover:text-orange-600 focus:text-orange-600 text-orange-600"}`} to="/bourse/valid">
                    {!mobile3 && <>Bourse valide</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                    </svg>}
                </Link>
            </Whisper>
            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover>
                        <div> Archive</div>
                    </Popover>
                }
            >
                <Link className={`w-full  h-full flex items-end border-b-2 ${boursearchive.test(pathname) && "border-orange-600 hover:text-orange-600 focus:text-orange-600 text-orange-600"}`} to="/bourse/archive">
                    {!mobile3 && <>Archive</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
                    </svg>}
                </Link>
            </Whisper>

        </div>
    )
} export default NavBarsBourse
