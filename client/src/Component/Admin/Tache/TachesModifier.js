
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Popover, Whisper, Button, Dropdown } from 'rsuite';
import { FadeLoader } from 'react-spinners'
import Footer from '../../Visiteur/FootentContent/Footer';
import TachesNavBars from './TachesNavBars';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';



function TachesModifier() {
    const [boutLoading, setboutLoading] = useState(false);

    const { id } = useParams()
    const tacheId = decryptData(id)
    const [Activite_prévus, GetActivite_prévus] = useState('')
    const [Activite_prévusAnimate, GetActivite_prévusAnimate] = useState('')
    const [Activite_prévusMessage, GetActivite_prévusMessage] = useState(false)
    const elemenRefActivite_prévus = useRef(null)






    const [date, Getdate] = useState('')
    const [dateMessage, GetdateMessage] = useState(false)
    const [dateAnimate, GetdateAnimate] = useState('')
    const elemenRefdate = useRef(null)

    const [heursDebuts, GetheursDebuts] = useState('')
    const [informationheursDebuts, GetinformationheursDebuts] = useState('')
    const [heursDebutsMessage, GetheursDebutsMessage] = useState(false)
    const [heursDebutsAnimate, GetheursDebutsAnimate] = useState('')
    const heursDebutsRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const elemenRefheursDebuts = useRef(null)


    const [heursFin, GetheursFin] = useState('')
    const [heursFinMessage, GetheursFinMessage] = useState(false)
    const [nom_médicamenAnimate, GetAnimate] = useState('')
    const elemenRefheursFin = useRef(null)

    const navigate = useNavigate()



    useEffect(() => {
        axios.get(`http://localhost:8005/tache/BuyId/${tacheId}`)
            .then(response => {
                const formattedDate = new Date(response.data.date).toISOString().split('T')[0];
                // Convertir l'heure de format HH:mm:ss en format HH:mm
                const formattedStartTime = response.data.heuredebut.slice(0, 5);
                const formattedEndTime = response.data.heurefin.slice(0, 5);
                console.log(response.data.date)
                GetActivite_prévus(response.data.activite);
                Getdate(formattedDate);
                GetheursDebuts(formattedStartTime);
                GetheursFin(formattedEndTime);
                Setloadings(false)
            })
            .catch(error => {
                console.error("Error fetching taches:", error);
                Setloadings(false)
            });
    }, [tacheId])


    const data = {
        activite: Activite_prévus,
        date: date,
        heuredebut: heursDebuts,
        heurefin: heursFin,
    }

    const [loadings, Setloadings] = useState(true)
    const HundlesSend = e => {
        e.preventDefault()
        if (Activite_prévus.trim() == "") {
            GetActivite_prévusMessage(true)
            GetActivite_prévusAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetActivite_prévusMessage(false)
                GetActivite_prévusAnimate('')
            }, 4000);
            elemenRefActivite_prévus.current && elemenRefActivite_prévus.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefActivite_prévus.current && elemenRefActivite_prévus.current.focus()
            return false
        } else if (date.trim() == "") {
            GetdateMessage(true)
            GetdateAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetdateAnimate('')
                GetdateMessage(false)
            }, 4000);
            elemenRefdate.current && elemenRefdate.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefdate.current && elemenRefdate.current.focus()
            return false
        } else if (heursDebuts.trim() == "") {
            GetheursDebutsMessage(true)
            GetheursDebutsAnimate('animate__animated animate__shakeX border border-red-500')
            GetinformationheursDebuts('heursDebuts du client est obligatoire !!')
            setTimeout(() => {
                GetheursDebutsAnimate('')
                GetheursDebutsMessage(false)
                GetinformationheursDebuts('')
            }, 4000);
            elemenRefheursDebuts.current && elemenRefheursDebuts.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefheursDebuts.current && elemenRefheursDebuts.current.focus()
            return false
        } else if (heursFin.trim() == "") {
            GetheursFinMessage(true)
            GetAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetheursFinMessage(false)
                GetAnimate('')
            }, 4000);
            elemenRefheursFin.current && elemenRefheursFin.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefheursFin.current && elemenRefheursFin.current.focus()
            return false
        }
        else {
            setboutLoading(true)
            axios.put(`http://localhost:8005/tache/${tacheId}`, data)
                .then((response) => {
                    toast.success('Données envoyées avec succès!');
                    navigate("/tache");
                    setboutLoading(false)

                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        toast.error(`Erreur : ${error.response.data.error}`);
                        setboutLoading(false)

                    } else {
                        toast.error('Une erreur s\'est produite lors de l\'envoi des données.');
                        setboutLoading(false)

                    }
                    console.error('Erreur lors de l\'envoi des données au backend :', error);
                    setboutLoading(false)

                });
        }

    }


    const [mobile, GetMobile] = useState(window.innerWidth < 772)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)
    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 772)
            SetMobile3(window.innerWidth < 342)

        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])



    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <TachesNavBars />
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className="flex items-center w-full justify-between">
                    <Link to='/tache' className="w-8 h-8 flex justify-center items-center text-green-500"
                    >                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>

                </div>
                <div className="  flex flex-col items-center rounded-lg shadow-lg w-[99%] ">
                    <div className="flex flex-col w-full  items-center justify-center p-2">
                        <div className='w-full flex justify-center'>
                            <div>
                                <div className="uppercase text-[25px] mt-3 font-semibold">Modifier tache</div>
                            </div>
                        </div>
                        <div className="w-full  rounded-lg   h-full ">

                            <div className="p-3  overflow-y-auto overflow-x-hidden">
                                <form onSubmit={HundlesSend} className='w-full'>

                                    <Whisper
                                        placement="bottomStart"

                                        open={Activite_prévusMessage}
                                        speaker={<Popover>
                                            <div className='text-red-700'>
                                                L'activite prévus du tache  est obligatoire !!
                                            </div>
                                        </Popover>}
                                    >
                                        <div className="w-full relative mb-2">
                                            <label htmlFor="company" className="block mb-1 text-sm font-medium ">L'activite prévus du tache du contrant </label>
                                            <textarea
                                                value={Activite_prévus}
                                                ref={elemenRefActivite_prévus}
                                                onChange={(e) => GetActivite_prévus(e.target.value)}
                                                className={`w-full  border  outline-none focus:border-green-500 min-h-[15em]  rounded-md p-2.5  bg-transparent  border-gray-300 ${Activite_prévusAnimate}`}
                                                placeholder=" L'activite prévus du tache "
                                            >

                                            </textarea>
                                        </div>
                                    </Whisper>

                                    <div className={`w-full flex mt-4  items-center ${mobile ? 'flex-col gap-2' : ''} `}>
                                        <Whisper
                                            placement="bottomStart"

                                            open={dateMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    Date de tache est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">Date de tache</label>
                                                <input
                                                    type='date'
                                                    value={date}
                                                    ref={elemenRefdate}
                                                    onChange={(e) => Getdate(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${dateAnimate}`}
                                                    placeholder="Date de tache"
                                                />

                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"

                                            open={heursDebutsMessage}
                                            speaker={
                                                <Popover>
                                                    <div className='text-red-600'> Heure de début de tache est obligatoire !!</div>
                                                </Popover>
                                            }
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">Heure de début de tache</label>
                                                <input
                                                    type='time'
                                                    value={heursDebuts}
                                                    ref={elemenRefheursDebuts}
                                                    onChange={(e) => GetheursDebuts(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${heursDebutsAnimate}`}
                                                    placeholder="Heure de début de tache"
                                                />
                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"

                                            open={heursFinMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    Heure fin de tache est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full relative mx-1 mb-2">
                                                <label className="block  mb-2   text-sm font-medium"> Heure fin de tache</label>
                                                <input
                                                    type='time'
                                                    value={heursFin}
                                                    ref={elemenRefheursFin}
                                                    onChange={(e) => GetheursFin(e.target.value)}
                                                    className={`w-full  border  outline-none   rounded-md p-2.5  bg-transparent  border-gray-300 ${nom_médicamenAnimate} focus:border-green-500`}
                                                    placeholder="Heure fin de tache"
                                                />
                                            </div>
                                        </Whisper>


                                    </div>


                                    <div className=" flex justify-end  w-full">
                                        {boutLoading ? (
                                            <>
                                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                                    <input type="submit" id="send" value='Modifier' className='pointer-events-none' />
                                                    <div disabled className='absolute pointer-events-none  bg-transparent pt-4  pl-4  w-full h-full flex justify-center items-center z-50'>
                                                        <FadeLoader
                                                            color="rgb(255, 255, 255)"
                                                            height={10}
                                                            margin={-9}
                                                            radius={100}
                                                            speedMultiplier={1}
                                                            width={1}
                                                        />
                                                    </div>
                                                </button>
                                            </>
                                        ) : (<>
                                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-green-600   p-2 rounded  text-white">
                                                <input type="submit" id="send" value="Modifier" className='cursor-pointer'></input>
                                            </label>
                                        </>)}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default TachesModifier



