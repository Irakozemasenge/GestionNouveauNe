/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Popover, Whisper } from 'rsuite';
import { FadeLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import ClientNavBars from './ClientNavBars';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../../Visiteur/FootentContent/Footer';

function AjouteClientAdmin() {
    const [boutLoading, setboutLoading] = useState(false);
    const navigate = useNavigate()

    const [nomComplet, GetnomComplet] = useState('')
    const [nomCompletMessage, GetnomCompletMessage] = useState(false)
    const [nom_médicamenAnimate, GetAnimate] = useState('')
    const elemenRefnomComplet = useRef(null)


    const [telephone, Gettelephone] = useState('')
    const [telephoneMessage, GettelephoneMessage] = useState(false)
    const [telephoneAnimate, GettelephoneAnimate] = useState('')
    const elemenReftelephone = useRef(null)

    const [email, Getemail] = useState('')
    const [informationEmail, GetinformationEmail] = useState('')
    const [emailMessage, GetemailMessage] = useState(false)
    const [emailAnimate, GetemailAnimate] = useState('')
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const elemenRefemail = useRef(null)

    const [service, Getservice] = useState('')
    const [serviceMessage, GetserviceMessage] = useState(false)
    const [serviceAnimate, GetserviceAnimate] = useState('')
    const elemenRefservice = useRef(null)



    const [montant, Getmontant] = useState('')
    const [montantAnimate, GetmontantAnimate] = useState('')
    const [montantMessage, GetmontantMessage] = useState(false)
    const elemenRefmontant = useRef(null)


    const data = {
        nomcomplet: nomComplet,
        tel: telephone,
        email: email,
        service: service,
        montant: montant

    }

    const HundlesSend = e => {
        e.preventDefault()
        if (nomComplet.trim() == "") {
            GetnomCompletMessage(true)
            GetAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetnomCompletMessage(false)
                GetAnimate('')
            }, 4000);
            elemenRefnomComplet.current && elemenRefnomComplet.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefnomComplet.current && elemenRefnomComplet.current.focus()
            return false
        } else if (telephone.trim() == "") {
            GettelephoneMessage(true)
            GettelephoneAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GettelephoneAnimate('')
                GettelephoneMessage(false)
            }, 4000);
            elemenReftelephone.current && elemenReftelephone.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenReftelephone.current && elemenReftelephone.current.focus()
            return false
        }
        else if (email.trim() == "") {
            GetemailMessage(true)
            GetemailAnimate('animate__animated animate__shakeX border border-red-500')
            GetinformationEmail('Email du client est obligatoire !!')
            setTimeout(() => {
                GetemailAnimate('')
                GetemailMessage(false)
                GetinformationEmail('')
            }, 4000);
            elemenRefemail.current && elemenRefemail.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefemail.current && elemenRefemail.current.focus()
            return false
        } else if (!email.trim().match(emailRegex)) {
            GetemailMessage(true)
            GetemailAnimate('animate__animated animate__shakeX border border-red-500')
            GetinformationEmail('Email du client est incorrecte !!')
            setTimeout(() => {
                GetemailAnimate('')
                GetemailMessage(false)
                GetinformationEmail('')
            }, 4000);
            elemenRefemail.current && elemenRefemail.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefemail.current && elemenRefemail.current.focus()
            return false


        } else if (service.trim() == "") {
            GetserviceMessage(true)
            GetserviceAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetserviceAnimate('')
                GetserviceMessage(false)
            }, 4000);
            elemenRefservice.current && elemenRefservice.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefservice.current && elemenRefservice.current.focus()
            return false
        }
        else if (String(montant).trim() == "") {
            GetmontantMessage(true)
            GetmontantAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetmontantMessage(false)
                GetmontantAnimate('')
            }, 4000);
            elemenRefmontant.current && elemenRefmontant.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefmontant.current && elemenRefmontant.current.focus()
            return false
        } else {
            setboutLoading(true)
            axios.post("http://localhost:8005/client", data)
                .then(response => {
                    toast.success('Client ajouté avec succès');
                    navigate("/Client")
                    setboutLoading(false)
                })
                .catch(error => {
                    if (error.response) {
                        // Si le backend renvoie une erreur
                        const errorMessage = error.response.data.errors;
                        toast.error(errorMessage);
                        setboutLoading(false)
                    } else {
                        // Si une autre erreur se produit (ex: problème de connexion)
                        toast.error('Une erreur s\'est produite lors de la communication avec le serveur.');
                        setboutLoading(false)
                    }
                });

        }

    }


    const [mobile, GetMobile] = useState(window.innerWidth < 1133)
    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 1133)
        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])

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
        <div className='w-full'>
            <ClientNavBars />
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className="  flex flex-col items-center rounded-lg shadow-lg w-[99%] ">
                    <div className="flex flex-col w-full  items-center justify-center p-2">
                        <div className='w-full flex justify-center'>
                            <div>
                                <div className="uppercase text-center text-[15px] sm:text-[25px] mt-3 font-semibold">Ajouter un nouveau client</div>
                            </div>
                        </div>
                        <div className="w-full  rounded-lg   h-full ">

                            <div className="p-3  overflow-y-auto overflow-x-hidden">
                                <form onSubmit={HundlesSend} className='w-full'>
                                    <div className={`w-full flex mt-4 ${mobile ? 'flex-col gap-4' : ''} items-center`}>
                                        <Whisper
                                            placement="bottomStart"

                                            open={nomCompletMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    Nom complet est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full relative mx-1 mb-2">
                                                <label className="block  mb-2   text-sm font-medium">Nom complet client/Societe</label>
                                                <input
                                                    value={nomComplet}
                                                    ref={elemenRefnomComplet}
                                                    onChange={(e) => GetnomComplet(e.target.value)}
                                                    className={`w-full  border  outline-none   rounded-md p-2.5  bg-transparent  border-gray-300 ${nom_médicamenAnimate} focus:border-green-500`}
                                                    placeholder="Nom complet" />
                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"

                                            open={telephoneMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    Le  numero de watsapp  est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">Numéro de watsapp</label>
                                                <input
                                                    type='tel'
                                                    value={telephone}
                                                    ref={elemenReftelephone}
                                                    onChange={(e) => Gettelephone(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${telephoneAnimate}`}
                                                    placeholder="Numéro de watsapp" />

                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"

                                            open={emailMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>{informationEmail}</div>
                                            </Popover>}
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">Email</label>
                                                <input
                                                    value={email}
                                                    ref={elemenRefemail}
                                                    onChange={(e) => Getemail(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${emailAnimate}`}

                                                    placeholder="Email" />
                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"
                                            open={serviceMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>

                                                    Le montant paye  est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">

                                                <label htmlFor="company" className="block mb-1 text-sm font-medium "> Le montant (en Fbu)</label>
                                                <input
                                                    value={montant}
                                                    ref={elemenRefmontant}
                                                    onChange={(e) => Getmontant(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${serviceAnimate}`}
                                                    placeholder="montant(en Fbu)"
                                                />
                                            </div>
                                        </Whisper>


                                    </div>
                                    <Whisper
                                        placement="bottomStart"

                                        open={montantMessage}
                                        speaker={<Popover>
                                            <div className='text-red-700'>
                                                Service rendu  est obligatoire !!
                                            </div>
                                        </Popover>}
                                    >
                                        <div className="w-full relative mb-2">
                                            <label className="block  mb-2 text-sm font-medium">Service rendu</label>
                                            <textarea
                                                value={service}
                                                ref={elemenRefservice}
                                                onChange={(e) => Getservice(e.target.value)}
                                                className={`w-full  border  min-h-[15em] outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${montantAnimate}`}
                                                placeholder="Service rendu"
                                            >

                                            </textarea>
                                        </div>
                                    </Whisper>

                                    <div className=" flex justify-end  w-full">
                                        {boutLoading ? (
                                            <>
                                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                                    <input type="submit" id="send" value='Enregister' className='pointer-events-none' />
                                                    <div disabled className='absolute pointer-events-none  bg-transparent pt-4  pl-4  w-full h-full flex justify-center items-center z-50'>
                                                        <FadeLoader
                                                            color="rgb(255, 255, 255)"
                                                            height={10}
                                                            margin={-9}
                                                            radius={100}
                                                            speedMultiplier={1}
                                                            width={1} />
                                                    </div>
                                                </button>
                                            </>
                                        ) : (<>
                                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-green-600   p-2 rounded  text-white">
                                                <input type="submit" id="send" value="Enregister" className='cursor-pointer'></input>
                                            </label>
                                        </>)}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div></div>
    )
}

export default AjouteClientAdmin



