/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Popover, Whisper } from 'rsuite';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

function Contact() {
    const socket = useRef();
    const uniqueId = uuidv4();
    // Connect to Socket.io
    useEffect(() => {

        socket.current = io("ws://localhost:8006");
        socket.current.emit("new-user-add", {
            role: "visiteur",
            userId: uniqueId,
            // ipAddress: ip,
        });

    }, []);











    const [boutLoading, setboutLoading] = useState(false);

    const [nomcomplet, Getnomcomplet] = useState('')
    const [nomcompletMessage, GetnomcompletMessage] = useState(false)
    const [nom_médicamenAnimate, GetAnimate] = useState('')
    const elemenRefnomcomplet = useRef(null)


    const [tel, Gettel] = useState('')
    const [telMessage, GettelMessage] = useState(false)
    const [telAnimate, GettelAnimate] = useState('')
    const elemenReftel = useRef(null)

    const [email, Getemail] = useState('')
    const [informationEmail, GetinformationEmail] = useState('')
    const [emailMessage, GetemailMessage] = useState(false)
    const [emailAnimate, GetemailAnimate] = useState('')
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const elemenRefemail = useRef(null)

    const [categorie, Getcategorie] = useState('')
    const [categorieMessage, GetcategorieMessage] = useState(false)
    const [categorieAnimate, GetcategorieAnimate] = useState('')
    const elemenRefcategorie = useRef(null)



    const [description, Getdescription] = useState('')
    const [descriptionAnimate, GetdescriptionAnimate] = useState('')
    const [descriptionMessage, GetdescriptionMessage] = useState(false)
    const elemenRefdescription = useRef(null)
    const MAX_CHARACTERS = 1500;

    console.log("descriptiondescriptiondescription", description.length)

    const HundlesSend = e => {
        // Émission d'un événement socket pour informer du nouveau message
        //socket.current.emit("new-message", { message: "OK" });
        e.preventDefault()
        if (nomcomplet.trim() == "") {
            GetnomcompletMessage(true)
            GetAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetnomcompletMessage(false)
                GetAnimate('')
            }, 4000);
            elemenRefnomcomplet.current && elemenRefnomcomplet.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefnomcomplet.current && elemenRefnomcomplet.current.focus()
            return false
        } else if (tel.trim() == "") {
            GettelMessage(true)
            GettelAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GettelAnimate('')
                GettelMessage(false)
            }, 4000);
            elemenReftel.current && elemenReftel.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenReftel.current && elemenReftel.current.focus()
            return false
        }
        else if (email.trim() == "") {
            GetemailMessage(true)
            GetemailAnimate('animate__animated animate__shakeX border border-red-500')
            GetinformationEmail('Votre email est obligatoire !!')
            setTimeout(() => {
                GetemailAnimate('')
                GetemailMessage(false)
                GetinformationEmail('')
            }, 4000);
            elemenRefemail.current && elemenRefemail.current.focus()
            return false
        } else if (!email.trim().match(emailRegex)) {
            GetemailMessage(true)
            GetemailAnimate('animate__animated animate__shakeX border border-red-500')
            GetinformationEmail('Votre email du client est incorrecte !!')
            setTimeout(() => {
                GetemailAnimate('')
                GetemailMessage(false)
                GetinformationEmail('')
            }, 4000);
            elemenRefemail.current && elemenRefemail.current.focus()
            return false


        } else if (categorie.trim() == "") {
            GetcategorieMessage(true)
            GetcategorieAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetcategorieAnimate('')
                GetcategorieMessage(false)
            }, 4000);
            elemenRefcategorie.current && elemenRefcategorie.current.focus()
            return false
        }
        else if (description.trim() == "") {
            GetdescriptionMessage(true)
            GetdescriptionAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetdescriptionMessage(false)
                GetdescriptionAnimate('')
            }, 4000);
            elemenRefdescription.current && elemenRefdescription.current.focus()
            return false
        } else if (description.length > MAX_CHARACTERS) {
            toast(
                <div>
                    Vous avez atteint la limite de {MAX_CHARACTERS} caractères. Veuillez raccourcir votre texte.
                </div>
            )
            GetdescriptionAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetdescriptionAnimate('')
            }, 4000);
            elemenRefdescription.current && elemenRefdescription.current.focus()
            return false
        } else {
            setboutLoading(true)
            axios.post('http://localhost:8005/demande/ajouter', {
                nomcomplet: nomcomplet,
                tel: tel,
                email: email,
                categorie: categorie,
                description: description
            })
                .then(response => {
                    toast.success('Votre demande de service a été envoyée avec succès.');
                    Getnomcomplet("")
                    Gettel("")
                    Getemail("")
                    Getcategorie("")
                    Getdescription("")
                    setboutLoading(false)
                    // Émission d'un événement socket pour informer du nouveau message
                    socket.current.emit("new-message", { message: "Nouveau message envoyé !" });
                })
                .catch(error => {
                    if (error.response) {
                        // Erreurs renvoyées par le backend
                        const errorMessage = error.response.data.error;
                        toast.error(Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage);
                        setboutLoading(false)
                    } else {
                        console.error('Erreur lors de l\'envoi de la demande de service:', error.response.data);
                        toast.error('Erreur lors de l\'envoi de la demande de service.');
                        setboutLoading(false)
                    }
                });

        }

    }

    const [mobile1, Setmobile1] = useState(window.innerWidth < 1122);
    const [mobile2, Setmobile2] = useState(window.innerWidth < 698);
    const [mobile3, Setmobile3] = useState(window.innerWidth < 447);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 1122)
            Setmobile2(window.innerWidth < 698)
            Setmobile3(window.innerWidth < 447)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className=' sm:mt-[5em] mt-1 p-1 sm:p-4'>
            <div className='sm:text-2xl text-lg text-[#5dca32] font-serif'>Demande de service maintenant</div>
            <div className='border-[1px] rounded-md p-2  border-[#5dca32] w-[95%]  pl-1 mx-1'>
                <div>
                    <form onSubmit={HundlesSend} className='w-full'>
                        <div className={`w-full flex  mt-4 ${mobile1 ? 'flex-col gap-3' : ''} items-center`}>
                            <Whisper
                                placement="bottomStart"

                                open={nomcompletMessage}
                                speaker={<Popover>
                                    <div className='text-red-700'>
                                        Votre  nom complet est obligatoire !!
                                    </div>
                                </Popover>}
                            >
                                <div className="w-full relative mx-1 mb-2">
                                    <label className="block  mb-2   text-sm font-medium">Votre nom complet</label>
                                    <input
                                        value={nomcomplet}
                                        ref={elemenRefnomcomplet}
                                        onChange={(e) => Getnomcomplet(e.target.value)}
                                        className={`w-full  border  outline-none   rounded-md p-2.5  bg-transparent  border-gray-300 ${nom_médicamenAnimate} focus:border-green-500`}
                                        placeholder="Nom complet" />
                                </div>
                            </Whisper>
                            <Whisper
                                placement="bottomStart"

                                open={telMessage}
                                speaker={<Popover>
                                    <div className='text-red-700'>
                                        Le  numéro de watsapp  est obligatoire !!
                                    </div>
                                </Popover>}
                            >
                                <div className="w-full mx-1 relative mb-2 ">
                                    <label className="block  mb-2 text-sm font-medium">Votre watsapp</label>
                                    <input
                                        type='tel'
                                        value={tel}
                                        ref={elemenReftel}
                                        onChange={(e) => Gettel(e.target.value)}
                                        className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${telAnimate}`}
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
                                    <label className="block  mb-2 text-sm font-medium">Votre email</label>
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
                                open={categorieMessage}
                                speaker={<Popover>
                                    <div className='text-red-700'>
                                        Précisez le service d'avocat  que vous souhaitez !!
                                    </div>
                                </Popover>}
                            >
                                <div className="w-full mx-1 relative mb-2 ">
                                    <label className="block  mb-2 text-sm font-medium">Service</label>
                                    <select
                                        value={categorie}
                                        ref={elemenRefcategorie}
                                        onChange={(e) => Getcategorie(e.target.value)}
                                        placeholder="Prix unitaire"
                                        className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${categorieAnimate}`}
                                    >
                                        <option hidden value=''>Sélectionne le Service</option>
                                        <option className='text-black' value='affaires'>Avocat droit  des affaires</option>
                                        <option className='text-black' value='bancaire'>Avocat droit  bancaire</option>
                                        <option className='text-black' value='sociétés'>Avocat droit  des sociétés</option>
                                        <option className='text-black' value='commercial'>Avocat droit  commercial</option>
                                        <option className='text-black' value='travail'>Avocat droit  du travail</option>
                                        <option className='text-black' value='media'>Avocat droit  des media</option>
                                        <option className='text-black' value='crédit'>Avocat droit  du crédit</option>
                                        <option className='text-black' value='paiement'>Avocat droit  de moyen de paiement</option>
                                        <option className='text-black' value='auteur'>Avocat droit  d'auteur </option>
                                        <option className='text-black' value='marque'>Avocat droit  de marque </option>
                                        <option className='text-black' value='dessiins/models'>Avocat droit  des dessiins et modèles </option>
                                        <option className='text-black' value='brevets'>Avocat droit  des brevets </option>
                                        <option className='text-black' value='immobilier'>Avocat droit  immobilier </option>
                                    </select>
                                </div>
                            </Whisper>


                        </div>
                        <Whisper
                            placement="bottomStart"

                            open={descriptionMessage}
                            speaker={<Popover>
                                <div className='text-red-700'>
                                    Votre  déscription   est obligatoire !!
                                </div>
                            </Popover>}
                        >
                            <div className="w-full relative mt-4 mb-2">
                                <label htmlFor="company" className="block mb-1 text-sm font-medium ">Déscription</label>
                                <textarea
                                    value={description}
                                    ref={elemenRefdescription}
                                    onCopy={(e) => Getdescription(e.target.value)}
                                    onInput={(e) => Getdescription(e.target.value)}
                                    onChange={(e) => Getdescription(e.target.value)}
                                    className={`w-full  border  outline-none focus:border-green-500 min-h-[15em]  rounded-md p-2.5  bg-transparent  border-gray-300 ${descriptionAnimate}`}
                                    placeholder="description"
                                >

                                </textarea>
                            </div>
                        </Whisper>

                        <div className=" flex justify-end  w-full">
                            {boutLoading ? (
                                <>
                                    <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                        <input type="submit" id="send" value='Envoyer message' className='pointer-events-none' />
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
                                <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-[#5dca32]   p-2 rounded  text-white">
                                    <input type="submit" id="send" value="Envoyer message" className='cursor-pointer'></input>
                                </label>
                            </>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact