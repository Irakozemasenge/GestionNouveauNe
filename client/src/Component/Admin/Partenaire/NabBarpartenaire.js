
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Popover, Whisper } from 'rsuite';
function NabBarpartenaire() {
    const url = window.location.pathname;

    const [mobile3, SetMobile3] = useState(window.innerWidth < 428)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 428)
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
                            Listes des Societes partenaires
                        </div>
                    </Popover>
                }
            >
                <Link className={`w-full border-b-2 pl-2 h-full flex items-end ${(url == "/partenaire" || url == "/partenaire/detail" || url == "/partenaire/modifier") && "border-fuchsia-600 hover:text-fuchsia-600 focus:text-fuchsia-600 text-fuchsia-600"}`} to='/partenaire'>
                    {!mobile3 && <>  Listes des Societes partenaires</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-kanban-fill" viewBox="0 0 16 16">
                        <path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1" />
                    </svg>
                    }
                </Link>
            </Whisper>

            <Whisper
                trigger='hover'
                placement='bottom'
                speaker={
                    <Popover>
                        Ajoute Societe partenaire
                    </Popover>
                }
            >
                <Link className={`w-full border-b-2 h-full flex items-end ${(url == "/partenaire/ajoute") && "border-fuchsia-600 hover:text-fuchsia-600 focus:text-fuchsia-600 text-fuchsia-600"}`} to='/partenaire/ajoute' >
                    {!mobile3 && <>  Ajoute Societe partenaire</>}
                    {mobile3 && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                        <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>}
                </Link>
            </Whisper>
        </div>
    )
} export default NabBarpartenaire
